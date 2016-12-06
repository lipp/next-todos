import React from 'react'

const AddTodoForm = ({addTodo}) => (
  <form onSubmit={(event) => {
    addTodo(event.target.title.value)
    event.target.title.value = ''
    event.preventDefault()
  }} >
    <input type='checkbox' />
    <input type='text' name='title' placeholder='What needs to be done?' />
    <button type='submit' style={{display: 'none'}} />
  </form>
)

export default AddTodoForm
