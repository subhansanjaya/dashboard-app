import express from 'express'
const router = express.Router()

import asyncHandler from 'express-async-handler'

import Subject from '../models/subjectModel.js'

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const subjects = await Subject.find({})
    res.json(subjects)
  })
)

export default router
