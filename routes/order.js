const express = require('express');
const Order = require('../models/Order');
const router = express.Router()


router.get('/', async (req, res) => {
    try {
        const user = await Order.findAll()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/id/:id', async (req, res) => {
    try {
        const user = await Order.findByPk(req.params.id)
        res.json({ data: user })
    } catch (error) {
        res.json({ error: error })
    }
})

router.post('/create', async (req, res) => {
    const { UserId, TableId, totalValue, totalValueTAx, state } = req.body

    Order.create({
        UserId: UserId,
        TableId: TableId,
        totalValue: totalValue,
        totalValueTAx: totalValueTAx,
        state: state
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})

router.put('/update', async (req, res) => {
    const { id, UserId, TableId, totalValue, totalValueTAx, state } = req.body

    if (id == undefined || id == "") {
        res.json({ error: "Error! An id must be provided!" })
    }

    const data = {
        UserId: UserId,
        TableId: TableId,
        totalValue: totalValue,
        totalValueTAx: totalValueTAx,
        state: state
    }

    Order.update(data,
        {
            where: {
                id: id
            },
        })

        .then(status => {
            status == 1
                ? res.json({ data: "Updated sucessfuly" })
                : res.json({ error: "Error! Data cannot be updated!" })
        })
        .catch(err => console.log(err))
})

router.delete('/delete', async (req, res) => {
    const { id } = req.body

    Order.destroy({
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