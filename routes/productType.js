const express = require('express');
const ProductType = require('../models/ProductType');
const router = express.Router()


router.get('/', (req, res) => {
    try {
        const user = ProductType.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await ProductType.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { name, description } = req.body

    ProductType.create({
        name: name,
        description: description,
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', async (req, res) => {
    const { id, name, description } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        name: name,
        description: description,
    }

    ProductType.update(data,
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

    ProductType.destroy({
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