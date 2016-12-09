import React from 'react'

export default ({addTodo, setAllCompleted, setAllValue, toggleSetAllValue}) => (
  <form action='javascript:' onSubmit={({target: {title}}) => {
    addTodo(title.value)
    title.value = ''
  }} >
    <input type='checkbox' onClick={() => {
      setAllCompleted(setAllValue)
      toggleSetAllValue()
    }} />
    <input type='text' name='title' placeholder='What needs to be done?' />
  </form>
)
