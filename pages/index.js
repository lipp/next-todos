import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { fetch, sorted, set, call } from 'redux-jet'
import thunk from 'redux-thunk'

const connection = {url: 'wss://todos-demo.now.sh'}

const mapStateToProps = (state) => ({
  todos: state
})

const Todo = connect(null, {set, call})(({set, call, todo: {path, value: {id, title, completed}}}) => (
  <li>
    <input
      value={title}
      onChange={(e) => set(connection, path, {title: e.target.value})}
    />
    <input
      type='checkbox'
      checked={completed}
      onChange={() => set(connection, path, {completed: !completed}) }
    />
    <button
      onClick={() => call(connection, 'todo/remove', [id])}
      >Remove</button>
  </li>
))

const Todos = connect(mapStateToProps)(({todos}) => (
  <ul>
    {todos.map(todo => <Todo key={todo.value.id} todo={todo} />)}
  </ul>
))

const AddTodo = connect(null, {call})(({call}) => (
  <form onSubmit={ (event) => {
    call(connection, 'todo/add', [event.target.title.value])
    event.preventDefault()
  }} >
    <input name='title' placeholder='Learn node' />
    <button type='submit'>Add</button>
  </form>
))

export default class Counter extends React.Component {

  componentDidMount () {
    fetch(connection, {
      path: {startsWith: 'todo/#'},
      sort: {
        byValueField: {id: 'number'},
        from: 1,
        to: 100
      }
    }, 'todos')(this.store.dispatch)
  }

  constructor (props) {
    super(props)
    this.store = createStore(sorted('todos'), applyMiddleware(thunk))
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
          <AddTodo />
          <Todos />
        </div>
      </Provider>
    )
  }
}
