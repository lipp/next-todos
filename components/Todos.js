import React from 'react'
import DebouncedInput from './DebouncedInput'

const Todo = ({connection, set, call, todo: {path, value: {id, completed, title}}}) => (
  <li>
    <input
      type='checkbox'
      checked={completed}
      onChange={() => set(connection, path, {completed: !completed})}
    />
    <DebouncedInput
      value={title}
      timeout={200}
      onChange={(e) => set(connection, path, {title: e.target.value})}
    />
    <button onClick={() => call(connection, 'todo/remove', [id])} />
  </li>
)

const Todos = ({connection, set, call, todos}) => (
  <ul className='todos'>
    {todos.map(todo => <Todo key={todo.value.id} todo={todo} connection={connection} set={set} call={call} />)}
  </ul>
)

export default Todos
