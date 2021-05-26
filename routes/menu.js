const express = require('express');
const Product = require('../models/Product');
const ProductOrganization = require('../models/ProductOrganization');
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const productOrganization = await ProductOrganization.findAll({
            where: {
                idOrganization: id
            }, include: [
                { model: Team, as: 'Home' }]
        })

        const products = await Product.findAll({
            where: {
                idOrganization: id
            }
        })

        console.log(productOrganization)

        const menu = []



        console.log("menu", menu)
        res.json({ data: menu })
    } catch (error) {
        res.json({ error: error })
    }
})


module.exports = router