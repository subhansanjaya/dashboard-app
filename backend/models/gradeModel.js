import mongoose from 'mongoose'

const gradeSchema = mongoose.Schema(
  {
    grade: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Grade = mongoose.model('Grade', gradeSchema)

export default Grade
