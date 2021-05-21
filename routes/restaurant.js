const express = require('express')
const router = express.Router()
const db = require('../config/database')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const userPermission = require('../verifications/userPermissions');
const Restaurant = require('../models/Restaurant');


router.get('/', async (req, res) => {
    try {
        const user = await Restaurant.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await Restaurant.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { restaurantType, name, address, gpsLocation, celphone, phone, nif } = req.body

    Restaurant.create({
        restaurantType: restaurantType,
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
    const { id, restaurantType, name, address, gpsLocation, celphone, phone, nif } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        restaurantType: restaurantType,
        name: name,
        address: address,
        gpsLocation: gpsLocation,
        celphone: celphone,
        phone: phone,
        nif: nif
    }

    Restaurant.update(data,
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

    Restaurant.destroy({
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