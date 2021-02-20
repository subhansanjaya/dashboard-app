import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const SummeryWidget = ({ options, subject, student }) => {
  const subjectList = useSelector((state) => state.subjectList)

  const { loading, error, subjects } = subjectList

  const subjectName = subjects.find((x) => x._id === subject).name

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <div>
      <h3 style={{ margin: '12px' }}>
        Average Marks for {subjectName} based on {student.length} Students
      </h3>
      <h2 style={{ color: 'green' }}>{options.map((option) => option.avg)}</h2>
    </div>
  )
}

export default SummeryWidget
