const express = require('express');
const ProductOrganization = require('../models/ProductOrganization');
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const products = await ProductOrganization.findAll({
            where: {
                idOrganization: id
            }
        })

        console.log(products)

        res.json({ data: products })
    } catch (error) {
        res.json({ error: error })
    }
})


module.exports = router