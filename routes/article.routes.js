const { Router } = require('express')
const { check } = require('express-validator')

const { validateFields } = require('../middlewares')

const { getArticle, createArticle } = require('../controllers')

const router = Router()

router.get('/', getArticle)

router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('descripcion', 'la descripcion del articulo es obligatoria').custom(
      articleByIdExists
    ),
    validateFields,
  ],
  createArticle
)
module.exports = router
