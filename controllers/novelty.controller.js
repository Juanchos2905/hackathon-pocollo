const { request, response } = require('express')
const { DateTime } = require('luxon')
const { isObjectId } = require('../helpers')

const { Novelty, User } = require('../models')

const getNovelties = async (req = request, res = response) => {
  try {
    const novelties = await Novelty.find({ status: true }).populate('user')

    res.status(200).json({
      total: novelties.length,
      novelties,
    })
  } catch (error) {
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

const createNovelty = async (req = request, res = response) => {
  try {
    const { user: userId, ...rest } = req.body

    const data = {
      ...rest,
      user: '',
      createdAt: DateTime.now(),
      modifiedAt: DateTime.now(),
    }

    if (!isObjectId(userId)) {
      return res.status(400).json({
        msg: 'Debe ser un id Mongo',
      })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        msg: `No existe un usuario con id ${userId} en la BD`,
      })
    }
    data.user = userId

    const novelty = await Novelty(data)
    novelty.save()

    res.status(201).json({
      novelty,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: 'Error en el servidor',
    })
  }
}

module.exports = {
  getNovelties,
  createNovelty,
}
