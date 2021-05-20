const express = require('express');
const Tax = require('../models/Tax');
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const user = await Tax.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await Tax.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { name, value } = req.body
    console.log("entrou")

    Tax.create({
        name: name,
        value: value
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', async (req, res) => {
    const { id, name, value } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        name: name,
        value: value
    }

    Tax.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => {
            status == 1
                ? res.json({ data: "Tax updated sucessfuly" })
                : res.json({ error: "The taxes can not be updated!" })
        })
        .catch(err => console.log(err))
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body

    Tax.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json({data: status}))
        .catch(err => res.json({ error: "Erro! Não foi possivel eliminar o registo!", err: err }))
})





module.exports = router