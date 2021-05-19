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

})

router.put('/update', async (req, res) => {

})

router.delete('/delete', async (req, res) => {

})





module.exports = router