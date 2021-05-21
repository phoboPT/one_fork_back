const express = require('express')
const router = express.Router()
const db = require('../config/database')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions');
const Organization = require('../models/Organization');


router.get('/', async (req, res) => {
    try {
        const user = await Organization.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await Organization.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { organizationType, name, address, gpsLocation, celphone, phone, nif } = req.body

    Organization.create({
        organizationType: organizationType,
        name: name,
        address: address,
        gpsLocation: gpsLocation,
        celphone: celphone,
        phone: phone,
        nif: nif
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', async (req, res) => {
    const { id, organizationType, name, address, gpsLocation, celphone, phone, nif } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        organizationType: organizationType,
        name: name,
        address: address,
        gpsLocation: gpsLocation,
        celphone: celphone,
        phone: phone,
        nif: nif
    }

    Organization.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => {
            status == 1
                ? res.json({ data: "Updated sucessfuly" })
                : res.json({ error: "Error! Data cannot be updated!" })
        })
        .catch(err => console.log(err))
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body

    Organization.destroy({
        where: {
            id: id
        },
    })
        .then(status => {
            status == 1
                ? res.json({ data: "Deleted sucessfuly" })
                : res.json({ error: "Error! Data cannot be deleted!" })
        })
        .catch(err => res.json({ error: "Error! Data cannot be deleted!", err: err }))
})

module.exports = router