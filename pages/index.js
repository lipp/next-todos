import React from 'react'
import Head from 'next/head'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { fetch, sorted, set, call, get } from 'redux-jet'
import thunk from 'redux-thunk'
import DebouncedInput from '../components/DebouncedInput'

const connection = {url: 'wss://todos-demo.now.sh'}

const Todo = connect(null, {set, call})(({set, call, todo: {path, value: {id, completed, title}}}) => (
  <li>
    <input
      type='checkbox'
      checked={completed}
      onChange={() => set(connection, path, {completed: !completed}) }
    />
    <DebouncedInput
      value={title}
      timeout={200}
      onChange={(e) => set(connection, path, {title: e.target.value})}
    />
    <button onClick={() => call(connection, 'todo/remove', [id])} />
  </li>
))

const mapStateToTodosProps = (state) => ({
  todos: state.display.todos
})

const Todos = connect(mapStateToTodosProps)(({todos}) => (
  <ul className='todos'>
    {todos.map(todo => <Todo key={todo.value.id} todo={todo} />)}
  </ul>
))

const AddTodo = connect(null, {call})(({call}) => (
  <form onSubmit={ (event) => {
    call(connection, 'todo/add', [event.target.title.value])
    event.preventDefault()
  }} >
    <input type='checkbox' />
    <input type='text' name='title' placeholder='What needs to be done?' />
    <button type='submit' style={{display: 'none'}} />
  </form>
))

const setFilter = (filter) => ({
  type: 'SET_FILTER',
  filter
})

const mapStateToFooterProps = (state) => ({
  active: state.active,
  completedIds: state.completed.map(todo => todo.value.id),
  selectedFilter: state.display.filter
})

const Footer = connect(mapStateToFooterProps, {setFilter, call})(({call, completedIds, selectedFilter, active, setFilter, todos}) => {
  const filters = ['all', 'active', 'completed']
  return (
  <footer>
    <span>
      {active.length === 0 ? 'no items ' : null}
      {active.length === 1 ? '1 item ' : null}
      {active.length > 1 ? active.length + ' items ' : null}
      left
    </span>
    <ul className='filters'>
      {filters.map(filter =>
        <li className={selectedFilter === filter && 'selected'} key={filter} onClick={() => setFilter(filter)}>{filter}</li>
      )}
    </ul>
    <a href='#' onClick={() => call(connection, 'todo/remove', completedIds)}>Clear completed</a>
  </footer>
  )
})

const chainReducers = (reducer, map) => {
  let reducerState
  let mapState
  return (state, action) => {
    reducerState = reducer(reducerState, action)
    mapState = map(reducerState, mapState, action)
    return mapState
  }
}

const initStore = (initialState) => {
  const filters = {
    completed: todo => todo.value.completed,
    active: todo => !todo.value.completed,
    all: todo => todo
  }

  const initialTodos = initialState ? initialState.display.todos : []
  const sortedTodos = sorted('todos', initialTodos)

  const store = createStore(combineReducers({
    display: chainReducers(sortedTodos, (todos, state = {filter: 'all', todos: []}, action) => {
      if (action.type === 'SET_FILTER') {
        state.filter = action.filter
      }
      state.todos = todos.filter(filters[state.filter])
      return state
    }),
    completed: chainReducers(sortedTodos, todos => todos.filter(filters.completed)),
    active: chainReducers(sortedTodos, todos => todos.filter(filters.active))
  }), applyMiddleware(thunk))
  return store
}

const todoExpression = {
  path: {startsWith: 'todo/#'},
   sort: {
     byValueField: {id: 'number'},
     from: 1,
     to: 100
   }
}

export default class App extends React.Component {

  static async getInitialProps ({req}) {
    if (req) {
      const store = initStore()
      return get(connection, todoExpression, 'todos')(store.dispatch).then((xx) => {
        return {initialState: store.getState(), store}
      })
    }
  }

  componentDidMount () {
    fetch(connection, todoExpression, 'todos')(this.store.dispatch)
  }

  constructor (props) {
    super(props)
    this.store = props.store.dispatch ? props.store : initStore(props.initialState)
  }

  render () {
    return (
      <Provider store={this.store}>
        <div>
        <section className='todoapp'>
          <Head>
            <title>Todos</title>
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel='stylesheet' href='/static/styles.css' />
          </Head>
          <h1>todos</h1>
          <AddTodo />
          <Todos />
          <Footer />
        </section>
          <p>Source code on <a href='https://github.com/lipp/next-todos'>GitHub</a></p>
        </div>
      </Provider>
    )
  }
}
