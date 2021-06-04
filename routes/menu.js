const express = require('express');
const Organization = require('../models/Organization');
const Product = require('../models/Product');
const ProductOrganization = require('../models/ProductOrganization');
const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const request = await ProductOrganization.findAll({
            where: { OrganizationId: id },
            include: [Product, Organization]
        })
        
        let dados = []
        request.map((valores) => {
            
            if(valores.dataValues.Product.dataValues.ProductTypeId === "dfc6f246-0e23-40c4-ab52-ac2450561aa8") {
                dados.push({"dfc6f246-0e23-40c4-ab52-ac2450561aa8": valores.dataValues.Product.dataValues})
            }
            dados.push({ProductTypeId: valores.dataValues.Product.dataValues})
         
        })
        
        res.json({ organization: request[0].Organization, products: dados})
        
    } catch (error) {
        res.json({ error: error })
    }
  
})


module.exports = router