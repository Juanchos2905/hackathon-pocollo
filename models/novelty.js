const { Schema, model } = require('mongoose')
const { DateTime } = require('luxon')

const NoveltySchema = Schema({
  title: {
    type: String,
    required: [true, 'La notici**a es obligatoria'],
  },
  description: {
    type: String,
    required: [true, 'La descripción es requerida'],
  },
  imgUrl: {
    type: String,
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
  },
  modifiedAt: {
    type: Date,
  },
})

NoveltySchema.methods.toJSON = function () {
  const { __v, _id, createdAt, modifiedAt, ...novelty } = this.toObject()
  novelty.id = _id
  novelty.createdAt = DateTime.fromISO(createdAt.toISOString())
  novelty.modifiedAt = DateTime.fromISO(modifiedAt.toISOString())

  const { __v: u__v, password, _id: u_id, ...user } = novelty.user
  user.id = u_id
  novelty.user = user

  return novelty
}

module.exports = model('Novelty', NoveltySchema)
