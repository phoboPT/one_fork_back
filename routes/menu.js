const express = require('express');
const Organization = require('../models/Organization');
const Product = require('../models/Product');
const ProductOrganization = require('../models/ProductOrganization');
const ProductType = require('../models/ProductType');
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const request = await ProductOrganization.findAll({
            where: { OrganizationId: id },
            include: [Product]
        })
        
        let dados = []
        request.map((valores) => {
            dados.push(valores.Product
            )
         
        })
        
        res.json({ data: dados, data2: request})
        
    } catch (error) {
        res.json({ error: error })
    }
  
})


module.exports = router