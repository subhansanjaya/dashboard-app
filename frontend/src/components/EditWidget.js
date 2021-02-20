import React, { useState, useEffect } from 'react'
import { Container, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editFromWidget } from '../actions/widgetActions'
import { listWidgets } from '../actions/widgetActions'

const EditWidget = ({ id, show, handleClose }) => {
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(listWidgets())
  // }, [dispatch])

  const studentList = useSelector((state) => state.studentList)
  const gradeList = useSelector((state) => state.gradeList)
  const subjectList = useSelector((state) => state.subjectList)

  const { grades } = gradeList
  const { students } = studentList
  const { subjects } = subjectList

  const widgetDetails = useSelector((state) =>
    state.widgetList.widgetItems.find((item) => item.id === id)
  )

  const [widget, setWidget] = useState({})

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setWidget({ ...widget, [name]: value })
  }

  // const {
  //   widgetType,
  //   chartType,
  //   semester,
  //   grade,
  //   subject,
  //   student,
  //   year,
  // } = widgetDetails

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(
      editFromWidget(
        id,
        widget.widgetType,
        widget.chartType,
        widget.semester,
        widget.grade,
        widget.subject,
        widget.student,
        widget.chartType
      )
    )

    setWidget('')

    handleClose(true)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Widget</Modal.Title>
          </Modal.Header>
          This is not completed :(
          {/* <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as='select'
                  defaultValue={widgetType}
                  onChange={handleInputChange}
                  name='widgetType'
                >
                  <option>Choose...</option>
                  <option value='1'>Chart</option>
                  <option value='2'>Summery</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              {widgetType == 1 || widget.widgetType == 1 ? (
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Chart</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={chartType}
                    onChange={handleInputChange}
                    name='chartType'
                  >
                    <option>Choose...</option>
                    <option value='1'>Marks for subjects</option>
                    <option value='2'>Marks for different subjects</option>
                    <option value='3'>Marks for all the years</option>
                  </Form.Control>
                </Form.Group>
              ) : (
                ''
              )}
            </Form.Row>

            {chartType == 2 || widgetType == 2 ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Subjects</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
                    onChange={subject}
                    name='subject'
                  >
                    <option>Choose...</option>
                    {subjects.map((subject) => (
                      <option value={subject._id}>{subject.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            ) : (
              ''
            )}

            {chartType == 1 || chartType == 2 || widgetType == 2 ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={grade}
                    onChange={handleInputChange}
                    name='grade'
                  >
                    <option>Choose...</option>
                    {grades.map((grade) => (
                      <option value={grade._id}>{grade.grade}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={semester}
                    onChange={handleInputChange}
                    name='semester'
                  >
                    <option>Choose...</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={year}
                    onChange={handleInputChange}
                    name='year'
                  >
                    <option>Choose...</option>
                    <option value='2011'>2011</option>
                    <option value='2012'>2012</option>
                    <option value='2013'>2013</option>
                    <option value='2014'>2014</option>
                    <option value='2015'>2015</option>
                    <option value='2016'>2016</option>
                    <option value='2017'>2017</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            ) : (
              ''
            )}

            {widgetType == 2 || chartType == 2 || chartType == 3 ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Student IDs</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue={student}
                    onChange={handleInputChange}
                    name='student'
                    multiple
                  >
                    <option>Choose...</option>

                    {students.map((student) => (
                      <option value={student._id}>{student.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form.Row>
            ) : (
              ''
            )}
          </Modal.Body> */}
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={onSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EditWidget
