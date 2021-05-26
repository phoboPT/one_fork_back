const express = require('express')
const router = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions');
const User = require('../models/User');


router.get('/', async (req, res) => {
    try {
        const user = await User.findAll({ attributes: ['id', 'name', "email", "permission", "fiscalNumber", "createdAt", "updatedAt"] })

        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    const { id } = req.params.id
    try {
        const user = await User.findOne({
            where: {
                id: id
            }
        })
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { name, email, password, address, fiscalNumber } = req.body
    try {
        const user = await User.create({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
            address: address,
            fiscalNumber: fiscalNumber
        })

        const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET)

        req.session = { jwt: token }
        res.json({ data: token })
    } catch (err) {
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
        const userUpdated = await User.update(data,
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

        const userDeleted = await User.destroy({
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
        const user = await User.findOne({
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

        res.status(401).json({ error: error })
    }
})

router.get('/me', async (req, res) => {
    const jwtToken = req.session.jwt
    let userID
    try {
        userID = jwt.verify(jwtToken, process.env.JWT_SECRET);
        if (!userID) {
            res.status(401).send({ error: "Invalid token" })
        }
        const user = await User.findOne({
            where: {
                id: userID.id
            }, attributes: ['id', 'name', "email", "permission", "fiscalNumber", "createdAt", "updatedAt"]
        })

        res.status(200).send({ data: user })

    } catch (error) {
        res.status(401).send({ error: error })
    }

})

module.exports = router