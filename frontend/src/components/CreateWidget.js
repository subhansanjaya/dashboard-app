import React from 'react'
import { useState } from 'react'
import { Button, Col, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { addToWidget } from '../actions/widgetActions'

const CreateWidget = ({ show, handleClose }) => {
  const studentList = useSelector((state) => state.studentList)
  const gradeList = useSelector((state) => state.gradeList)
  const subjectList = useSelector((state) => state.subjectList)

  const { students } = studentList
  const { grades } = gradeList
  const { subjects } = subjectList

  const [widget, setWidget] = useState({})

  const handleInputChange = (event) => {
    if (event.target.name == 'student') {
      const value = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      )
      const name = event.target.name

      setWidget({ ...widget, [name]: value })
    } else {
      const { name, value } = event.target
      setWidget({ ...widget, [name]: value })
    }
  }

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    // create an unique id for the widget
    let id = uuidv4()

    dispatch(
      addToWidget(
        id,
        widget.widgetType,
        widget.chartType,
        widget.semester,
        widget.grade,
        widget.subject,
        widget.student,
        widget.year
      )
    )

    setWidget('')

    handleClose(true)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Widget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={() => onSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as='select'
                  defaultValue='Choose...'
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
              {widget.widgetType == 1 ? (
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Chart</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
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

            {widget.chartType == 2 || widget.widgetType == 2 ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Subjects</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
                    onChange={handleInputChange}
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

            {widget.chartType == 1 ||
            widget.chartType == 2 ||
            widget.widgetType == 2 ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Grade</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
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
                    defaultValue='Choose...'
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
                    defaultValue='Choose...'
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

            {widget.widgetType == 2 ||
            widget.chartType == 2 ||
            widget.chartType == 3 ? (
              <Form.Row>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Student IDs</Form.Label>
                  <Form.Control
                    as='select'
                    defaultValue='Choose...'
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
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateWidget
