const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')
const {
  createNovelty,
  getNovelties,
} = require('../controllers/novelty.controller')

const router = Router()

router.get('/', getNovelties)

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('user', 'El id del ususario es obligatorio').not().isEmpty(),
    validateFields,
  ],
  createNovelty
)

module.exports = router
