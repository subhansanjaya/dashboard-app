import express from 'express'
const router = express.Router()

import asyncHandler from 'express-async-handler'

import Student from '../models/studentModel.js'

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const students = await Student.find({})
    res.json(students)
  })
)

export default router
