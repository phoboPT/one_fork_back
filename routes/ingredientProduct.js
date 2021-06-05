const express = require('express');
const IngredientProduct = require('../models/IngredientProduct');
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const user = await IngredientProduct.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await IngredientProduct.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { IngredientId, ProductId } = req.body

    await IngredientProduct.findAll({ where: { IngredientId: IngredientId, ProductId: ProductId, } })
        .then(status => dados = status)
        .catch(err => res.json({ error: "Error! This ingredient or product does not exists!" }))

    if (dados != "") {
        res.json({ error: "Error! This product already have this ingredient!" })
    } else {
        IngredientProduct.create({
            IngredientId: IngredientId,
            ProductId: ProductId
        })
            .then(status => res.json({ data: status }))
            .catch(err => res.send(err))
    }

})

router.put('/update', async (req, res) => {
    const { id, IngredientId, ProductId } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        IngredientId: IngredientId,
        ProductId: ProductId
    }

    IngredientProduct.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => {
            status == 1
                ? res.json({ data: "Updated sucessfuly" })
                : res.json({ error: "Data cannot be updated!" })
        })
        .catch(err => console.log(err))
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body

    IngredientProduct.destroy({
        where: {
            id: id
        },
    })
        .then(status => {
            status == 1
                ? res.json({ data: "Deleted sucessfuly" })
                : res.json({ error: "The IngredientProduct can not be deleted!" })
        })
        .catch(err => res.json({ error: "Error! Data cannot be deleted!", err: err }))
})





module.exports = router