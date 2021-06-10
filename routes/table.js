const express = require('express');
const Organization = require('../models/Organization');
const router = express.Router()
const Table = require('../models/Table');


router.get('/', async (req, res) => {
    try {
        const table = await Table.findAll()
        res.status(200).send(table)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const table = await Table.findByPk(req.params.id)
            .catch(err => res.json({error: "Error! Any table was find!"}))
        res.status(200).send({ data: table })
    } catch (error) {
        rres.status(400).send({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { OrganizationId, name, description } = req.body
    try {
        const table = await Table.create({
            OrganizationId: OrganizationId,
            name: name,
            description: description,
        })


        res.status(200).send({ data: table })
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

router.put('/update', async (req, res) => {
    const { id, OrganizationId, name, description } = req.body

    if (id == undefined || id == "") {
        res.status(400).send({ error: "Error! An id must be provided!" })
    }

    const data = {
        OrganizationId: OrganizationId,
        name: name,
        description: description,
    }
    try {

        const table = await Table.update(data,
            {
                where: {
                    id: id
                },
            })

        table == 1
            ? res.status(200).send({ data: "Updated sucessfuly" })
            : res.status(400).send({ error: "Error! Data cannot be updated!" })

    } catch (error) {

        res.status(200).send(err)
    }
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body

    Table.destroy({
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