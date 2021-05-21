const express = require('express');
const ProductRestaurant = require('../models/ProductRestaurant');
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const products = await ProductRestaurant.findAll({
            where: {
                idRestaurant: id
            }
        })

        console.log(products)

        res.json({ data: products })
    } catch (error) {
        res.json({ error: error })
    }
})


module.exports = router