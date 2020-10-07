const { Router } = require('express')
const express = require('express')
const User = require('../model/User.model')

const user = express.Router()

const regExIntChck = require('../middleware/regexCheck')
const { uuidv4RegExp } = require('../middleware/regexCheck')
const regexCheck = require('../middleware/regexCheck')
const sequelize = require('../sequelize')
// const { where } = require('sequelize/types');

user.get('/', async (req, res) => {
    try {
        const user = await User.findAll({
            attributes: { exclude: ['password'] },
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
})

user.get('/:uuid', regexCheck(uuidv4RegExp), async (req, res) => {
    const { uuid } = req.params
    try {
        const user = await User.findByPk(uuid, {
            attributes: { exclude: ['password'] },
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).send('Not found')
    }
})

user.post('/register', async (req, res) => {
    const { pseudo, password } = req.body
    try {
        const user = await User.create({ pseudo, password })
        const { uuid } = user
        res.status(201).json({ pseudo, uuid })
    } catch (error) {
        res.status(400).json(error)
    }
})

user.post('/login', async (req, res) => {
    const { pseudo, password } = req.body
    try {
        const user = await User.findOne({
            where: { pseudo },
        })
        const { uuid } = user
        if (user.validatePassword(password)) {
            res.status(200).json({ pseudo, uuid })
        } else {
            throw new Error()
        }
    } catch (error) {
        res.status(400).json({ message: 'something went wrong' })
    }
})

user.put('/:uuid/trials', async (req, res) => {
    const { uuid } = req.params
    try {
        const user = await User.update(
            { trials: sequelize.literal('trials + 1') },
            { where: { uuid } }
        )
        res.status(204)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

user.put('/:uuid/success', async (req, res) => {
    const { uuid } = req.params
    try {
        const user = await User.update(
            { successing: sequelize.literal('successing + 1') },
            { where: { uuid } }
        )
        res.status(204)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = user
