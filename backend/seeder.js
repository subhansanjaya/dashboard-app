import dotenv from 'dotenv'
import colors from 'colors'
import Student from './models/studentModel.js'
import Mark from './models/markModel.js'
import Subject from './models/subjectModel.js'
import Grade from './models/gradeModel.js'
import connectDB from './config/db.js'
import faker from 'faker'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Subject.deleteMany()
    await Grade.deleteMany()
    await Student.deleteMany()
    await Mark.deleteMany()

    // make grades
    let gradesArr = []

    for (let i = 0; i < 12; i++) {
      const grade = i + 1

      let newGrade = {
        grade,
      }
      gradesArr.push(newGrade)
    }

    await Grade.insertMany(gradesArr)

    const grades = await Grade.find()

    // make subjects
    const subjectsName = [
      'maths',
      'english',
      'physics',
      'science',
      'history',
      'chemistry',
      'biology',
      'art',
      'music',
      'geology',
    ]

    let subjectArr = []

    for (let i = 0; i < subjectsName.length; i++) {
      const name = subjectsName[i]

      let newSubject = {
        name,
      }
      subjectArr.push(newSubject)
    }

    await Subject.insertMany(subjectArr)

   

    const semesters = [1, 2]

    const currentYear = new Date().getFullYear()
    const range = (start, stop, step) =>
      Array.from(
        { length: (stop - start) / step + 1 },
        (_, i) => start + i * step
      )
    const years = range(currentYear, currentYear - 9, -1)

    // make students
    let students = []

    for (let i = 0; i < 20; i++) {
      const name = faker.name.firstName() + ' ' + faker.name.lastName()

      let newStudent = {
        name,
      }
      students.push(newStudent)
    }

    await Student.insertMany(students)

    const studentsIds = await Student.find()

    let marks = []

    for (let i = 0; i < studentsIds.length; i++) {
      const studentId = studentsIds[i]['_id']

      for (let i = 0; i < years.length; i++) {
        const year = years[i]

        for (let i = 0; i < semesters.length; i++) {
          const semester = semesters[i]

          for (let i = 0; i < subjects.length; i++) {
            const subject = subjects[i]['_id']

            for (let i = 0; i < 3; i++) {
              let newRecord = {
                subject: subject,
                grade: grades[i]['_id'],
                semester: semester,
                year: year,
                mark: faker.random.number({ min: 0, max: 100 }),
                student: studentId,
              }

              marks.push(newRecord)
            }
          }
        }
      }
    }

    await Mark.insertMany(marks)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
