import React from 'react'

const AddTodoForm = ({connection, call}) => (
  <form onSubmit={(event) => {
    call(connection, 'todo/add', [event.target.title.value])
    event.preventDefault()
  }} >
    <input type='checkbox' />
    <input type='text' name='title' placeholder='What needs to be done?' />
    <button type='submit' style={{display: 'none'}} />
  </form>
)

export default AddTodoForm
