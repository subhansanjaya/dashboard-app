import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listWidgets } from '../actions/widgetActions'
import { listStudents } from '../actions/studentActions'
import { listSubjects } from '../actions/subjectActions'
import { listGrades } from '../actions/gradeActions'
import Loader from './Loader'
import Message from './Message'

import { removeFromWidget } from '../actions/widgetActions'
import CreateWidget from './CreateWidget'
import EditWidget from './EditWidget'
import { FaEdit, FaTrash } from 'react-icons/fa'
import Widget from './Widget'

import { Container, Button, Row, Col, CardColumns, Card } from 'react-bootstrap'
//import { identity } from 'lodash'

const ListWidgets = () => {
  const dispatch = useDispatch()
  const widgetList = useSelector((state) => state.widgetList)

  const { loading, error, widgetItems } = widgetList

  useEffect(() => {
    dispatch(listWidgets())
    dispatch(listStudents())
    dispatch(listSubjects())
    dispatch(listGrades())
  }, [dispatch])

  const removeWidgetHandler = (id) => {
    dispatch(removeFromWidget(id))
  }

  const editWidgetHandler = (id) => {
    setWidgetId(id)
    editHandleShow(true)
    // dispatch(removeFromWidget(id))
  }

  const [widgetId, setWidgetId] = useState()

  const [widgets, setWidgets] = useState([])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [editShow, setEditShow] = useState(false)

  const editHandleClose = () => setEditShow(false)
  const editHandleShow = () => setEditShow(true)

  return (
    <Container>
      <Row>
        <Col>
          <Button
            onClick={handleShow}
            variant='primary'
            className='float-right'
          >
            Add New
          </Button>
        </Col>{' '}
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <CardColumns className='mt-5'>
          {' '}
          {widgetItems.map((widgetItem) => (
            <Card key={widgetItem.id}>
              <br />

              <Widget
                widgetType={widgetItem.widgetType}
                chartType={widgetItem.chartType}
                student={widgetItem.student}
                grade={widgetItem.grade}
                semester={widgetItem.semester}
                subject={widgetItem.subject}
                year={widgetItem.year}
              />

              <Button
                type='button'
                variant='light'
                onClick={() => editWidgetHandler(widgetItem.id)}
              >
                <FaEdit />
              </Button>

              <Button
                type='button'
                variant='light'
                onClick={() => removeWidgetHandler(widgetItem.id)}
              >
                <FaTrash />
              </Button>
            </Card>
          ))}
        </CardColumns>
      )}
      <Row>
        <CreateWidget show={show} handleClose={handleClose} />
      </Row>
      <Row>
        {widgetId ? (
          <EditWidget
            show={editShow}
            id={widgetId}
            handleClose={editHandleClose}
          />
        ) : (
          ''
        )}
      </Row>
    </Container>
  )
}

export default ListWidgets
