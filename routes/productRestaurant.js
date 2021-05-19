const express = require('express');
const ProductRestaurant = require('../models/ProductRestaurant');
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const user = await ProductRestaurant.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await ProductRestaurant.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {

})

router.put('/update', async (req, res) => {

})

router.delete('/delete', async (req, res) => {

})





module.exports = router