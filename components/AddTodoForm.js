import React from 'react'

export default ({addTodo}) => (
  <form action='javascript:' onSubmit={({target: {title}}) => {
    addTodo(title.value)
    title.value = ''
  }} >
    <input type='checkbox' />
    <input type='text' name='title' placeholder='What needs to be done?' />
  </form>
)
