const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')

const ArticleSchema = Schema({
  title: {
    type: String,
    required: [true, 'El titulo del articulo es requerido'],
  },

  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
})

ArticleSchema.methods.toJSON = function () {
  const { __v, _id, ...article } = this.toObject()
  article.id = _id
  article.createdAt = DateTime.fromISO(createdAt.toISOString())
  article.modifiedAt = DateTime.fromISO(modifiedAt.toISOString())

  const { __v: u__v, password, _id: u_id, ...user } = article.user
  user.id = u_id
  article.user = user

  return article
}

module.exports = model('Article', ArticleSchema)
