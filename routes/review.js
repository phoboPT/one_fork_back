const express = require('express');
const Review = require('../models/Review');
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const user = await Review.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await Review.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.get('/idOrganization/:id', async (req, res) => {
    try {
        const user = await Review.findAll({ where: { idOrganization: req.params.id } })
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { idOrganization, idUser, title, description, rating, image } = req.body


    Review.create({
        idOrganization: idOrganization,
        idUser: idUser,
        title: title,
        description: description,
        rating: rating,
        image: image
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', async (req, res) => {
    const { id, idOrganization, idUser, title, description, rating, image } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        idOrganization: idOrganization,
        idUser: idUser,
        title: title,
        description: description,
        rating: rating,
        image: image
    }

    Review.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => {
            status == 1
                ? res.json({ data: "Review updated sucessfuly" })
                : res.json({ error: "The Review can not be updated!" })
        })
        .catch(err => console.log(err))
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body

    Review.destroy({
        where: {
            id: id
        },
    })
        .then(status => {
            status == 1
                ? res.json({ data: "Review deleted sucessfuly" })
                : res.json({ error: "The Review can not be deleted!" })
        })
        .catch(err => res.json({ error: "Error! Data cannot be deleted!", err: err }))
})

module.exports = router
