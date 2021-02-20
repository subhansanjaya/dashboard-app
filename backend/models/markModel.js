import mongoose from 'mongoose'

const markSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Student',
    },
    grade: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'grade',
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'subject',
    },
    semester: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    mark: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Mark = mongoose.model('Mark', markSchema)

export default Mark
