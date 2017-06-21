import React from 'react'
import DebouncedInput from './DebouncedInput'

// The checkbox input uses onClick instead of onChange as recommended by preact wiki
// to prevent flickering.
// https://github.com/developit/preact/wiki/Forms#checkboxes--radio-buttons

const Todo = ({setCompleted, setTitle, remove, todo: {completed, title}}) => (
  <li>
    <input type='checkbox'
      checked={completed}
      onClick={(event) => { event.preventDefault(); setCompleted(!completed) }} />
    <DebouncedInput timeout={200}
      value={title}
      onChange={(e) => setTitle(e.target.value)} />
    <button onClick={remove} />
  </li>
)

export default ({setCompleted, setTitle, remove, todos}) => (
  <ul className='todos'>
    {todos.map(todo => <Todo key={todo.value.id}
      todo={todo.value}
      setCompleted={(completed) => setCompleted(todo.path, completed)}
      setTitle={(title) => setTitle(todo.path, title)}
      remove={() => remove(todo.value.id)}
     />)}
  </ul>
)
