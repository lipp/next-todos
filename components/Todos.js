import React from 'react'
import DebouncedInput from './DebouncedInput'

const Todo = ({setCompleted, setTitle, remove, todo: {completed, title}}) => (
  <li>
    <input type='checkbox'
      checked={completed}
      onChange={() => setCompleted(!completed)} />
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
