import express from 'express'
const router = express.Router()

import asyncHandler from 'express-async-handler'

import Grade from '../models/gradeModel.js'

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const grades = await Grade.find({})
    res.json(grades)
  })
)

export default router
