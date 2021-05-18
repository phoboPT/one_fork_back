const express = require('express')
const router = express.Router()
const db = require('../config/database')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions')

const Model = require('../models/User')

router.get('/', (req, res) => {
    try {
        const user = Model.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await Model.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { name, surname, email, password, organization, address, locale, zipcode, fiscalNumber } = req.body
    try {
        const user = await Model.create({
            name: name,
            surname: surname,
            email: email,
            password: bcrypt.hashSync(password, 10),
            organization: organization,
            address: address,
            locale: locale,
            zipcode: zipcode,
            fiscalNumber: fiscalNumber
        })

        const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET)

        req.session = { jwt: token }
        res.json({ data: token })
    } catch (error) {
        res.json({ error: err })
    }
})

router.put('/update', async (req, res) => {
    const { token, id, name, surname, email, password, active, permission, organization, address, locale, zipcode, fiscalNumber } = req.body
    try {
        if (!token) {
            return res.json({ error: "Token must be provided!" })
        }

        const tokenData = await userPermission.verifyPermission(token)
        if (tokenData[1] !== 'ADMIN' && tokenData[0] !== id) {
            return res.json({ error: "Administrator permission is required!" })
        }

        tokenData[1] === 'ADMIN' ? userId = id : userId = tokenData[0]

        const data = {
            name: name,
            surname: surname,
            email: email,
            password: password ? bcrypt.hashSync(password, 10) : undefined,
            active: tokenData[1] === 'ADMIN' ? active : undefined,
            permission: tokenData[1] === 'ADMIN' ? permission : undefined,
            organization: tokenData[1] === 'ADMIN' ? organization : undefined,
            address: address,
            locale: locale,
            zipcode: zipcode,
            fiscalNumber: fiscalNumber
        }
        const userUpdated = await Model.update(data,
            {
                where: {
                    id: userId
                },
            })

        if (userUpdated == 1) {

            res.status(200).json({ data: "User updated sucessfuly" })
        }
        res.status(400).json({ error: "The user can not be updated!" })
    } catch (err) {
        res.json({ error: err })
    }
})

router.delete('/delete', async (req, res) => {
    const { token, id } = req.body
    try {

        const tokenData = await userPermission.verifyPermission(token)
        if (tokenData[1] !== 'ADMIN') {
            res.status(400).json({ error: "Administrator permission is required!" })
        }

        const userDeleted = await Model.destroy({
            where: {
                id: id
            },
        })

        if (userDeleted == 1) {
            res.status(200).json({ data: "User deleted sucessfuly" })
        }
        res.status(400).json({ error: "The user does not exists!" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await Model.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            res.json({ error: "Invalid email or password!" })
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET);
            req.session = { jwt: token }

            res.status(200).json({ data: token })
        } else {
            res.status(401).json({ error: "Invalid email or password!" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: error })
    }
})

router.post('/me', async (req, res) => {
    if (!req.body.token) {
        res.json({ error: "No Token" })
    }
    let userID;
    try {
        userID = jwt.verify(req.body.token, process.env.JWT_SECRET);

        if (!userId) {
            res.status(401).json({ error: "Invalid token" })
        }
        const user = await Model.findByPk(userID.id)
        res.json({ data: user })

    } catch (error) {
        res.json({ error: error })
    }

})

module.exports = router