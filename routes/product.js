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


        res.status(200).send({ data: user })
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { ProductTypeId, name, description, TaxId, OrganizationId, image } = req.body

    try {
        const produt = await Product.create({
            ProductTypeId: ProductTypeId,
            name: name,
            description: description,
            TaxId: TaxId,
            OrganizationId: OrganizationId,
            image: image
        })
        res.status(200).send({ data: produt })
    } catch (error) {

        res.status(400).send({ error: error })
    }

})

router.put('/update', async (req, res) => {
    const { id, ProductTypeId, name, description, TaxId, OrganizationId, image } = req.body
    try {
        if (id == undefined || id == "") {
            res.status(401).send({ error: "Error! An id must be provided!" })
        }
        const data = {
            ProductTypeId: ProductTypeId,
            name: name,
            description: description,
            TaxId: TaxId,
            OrganizationId: OrganizationId,
            image: image
        }

        const productUpdated = await Product.update(data,
            {
                where: {
                    id: id
                },
            })
            
        if (productUpdated[0] === 1) {
            res.status(200).send({ data: "Updated sucessfuly" })
        } else {
            res.status(400).send({ error: "Error! Data cannot be updated!" })
        }
        
    } catch (error) {
        res.status(400).send({ error: "Error! Data cannot be updated!" })
    }
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