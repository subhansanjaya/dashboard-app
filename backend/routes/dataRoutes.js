import express from 'express'
const router = express.Router()
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
import asyncHandler from 'express-async-handler'
import Mark from '../models/markModel.js'

// @desc    Fetch data for marks for subjects
// @route   GET /api/data/chart1
// @access  Public
router.get(
  '/chart1',
  asyncHandler(async (req, res) => {
    const marks = await Mark.aggregate([
      {
        $match: {
          year: parseInt(req.query.year),
          semester: parseInt(req.query.semester),
          grade: ObjectId(req.query.grade),
        },
      },
      {
        $group: {
          _id: '$subject',
          sum: { $sum: '$mark' },
          avg: { $avg: '$mark' },
        },
      },
    ]).limit(1000)

    res.json(marks)
  })
)

// @desc    Fetch data for marks for different subjects
// @route   GET /api/data/chart1
// @access  Public
router.get(
  '/chart2',
  asyncHandler(async (req, res) => {
    console.log(req.params.semester)

    let studentIdArray = req.query.student.map((s) =>
      mongoose.Types.ObjectId(s)
    )

    const marks = await Mark.aggregate([
      {
        $match: {
          student: {
            $in: studentIdArray,
          },
          year: parseInt(req.query.year),
          semester: parseInt(req.query.semester),
          subject: ObjectId(req.query.subject),
          grade: ObjectId(req.query.grade),
        },
      },
      {
        $group: {
          _id: '$student',
          data: { $push: '$mark' },
        },
      },
    ]).limit(1000)
    res.json(marks)
  })
)

// @desc    Fetch data for student marks for all the years
// @route   GET /api/data/chart3
// @access  Public
router.get(
  '/chart3',
  asyncHandler(async (req, res) => {
    let studentIdArray = req.query.student.map((s) =>
      mongoose.Types.ObjectId(s)
    )

    const marks = await Mark.aggregate([
      {
        $match: {
          student: {
            $in: studentIdArray,
          },
        },
      },
      { $group: { _id: '$student', data: { $push: '$mark' } } },
    ]).limit(1000)

    res.json(marks)
  })
)

// @desc    Fetch data for summery widget
// @route   GET /api/data/summery
// @access  Public
router.get(
  '/summery',
  asyncHandler(async (req, res) => {
    console.log(req.params.semester)

    let studentIdArray = req.query.student.map((s) =>
      mongoose.Types.ObjectId(s)
    )

    const marks = await Mark.aggregate([
      {
        $match: {
          student: {
            $in: studentIdArray,
          },
          year: parseInt(req.query.year),
          semester: parseInt(req.query.semester),
          subject: ObjectId(req.query.subject),
          grade: ObjectId(req.query.grade),
        },
      },
      {
        $group: {
          _id: '$year',
          data: { $push: '$mark' },
          avg: { $avg: '$mark' },
        },
      },
    ]).limit(1000)

    res.json(marks)
  })
)

export default router
