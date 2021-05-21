const express = require('express');
const Product = require('../models/Product');
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const user = await Product.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await Product.findAll({
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
    const { productType, name, description, tax, idRestaurant } = req.body


    Product.create({
        productType: productType,
        name: name,
        description: description,
        tax: tax,
        idRestaurant: idRestaurant,
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', async (req, res) => {
    const { id, productType, name, description, tax, idRestaurant } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        productType: productType,
        name: name,
        description: description,
        tax: tax,
        idRestaurant: idRestaurant,
    }

    Product.update(data,
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

    Product.destroy({
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