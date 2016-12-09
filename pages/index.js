import React from 'react'
import Head from 'next/head'
import { Provider, connect } from 'react-redux'
import { call, set, get, fetch } from 'redux-jet'
import initStore from '../store.js'
import DisconnectedAddTodoForm from '../components/AddTodoForm'
import DisconnectedTodos from '../components/Todos'
import DisconnectedFooter from '../components/Footer'

const connection = {url: 'wss://todos-demo.now.sh'}

const connectAddTodoForm = () => {

  const actions = {
    addTodo: (title) => call(connection, 'todo/add', [title]),
    setAllCompleted: (completed) => call(connection, 'todo/setCompleted', [completed]),
    toggleSetAllValue: () => ({
      type: 'TOGGLE_SET_ALL_VALUE'
    })
  }

  const mapStateToProps = state => ({
    setAllValue: state.setAllValue
  })

  return connect(mapStateToProps, actions)(DisconnectedAddTodoForm)
}

const connectTodos = () => {
  const mapStateToProps = state => ({
    todos: state.display.todos
  })

  const todosActions = {
    setCompleted: (path, completed) => set(connection, path, {completed}),
    setTitle: (path, title) => set(connection, path, {title}),
    remove: id => call(connection, 'todo/remove', [id])
  }

  return connect(mapStateToProps, todosActions)(DisconnectedTodos)
}

const connectFooter = () => {
  const actions = {
    setFilter: filter => ({type: 'SET_FILTER', filter}),
    clearCompleted: () => call(connection, 'todo/clearCompleted')
  }

  const mapStateToProps = (state) => ({
    actives: state.active.length,
    selectedFilter: state.display.filter
  })

  return connect(mapStateToProps, actions)(DisconnectedFooter)
}

const AddTodoForm = connectAddTodoForm()
const Todos = connectTodos()
const Footer = connectFooter()

const todoExpression = {
  path: {startsWith: 'todo/#'},
  sort: {byValueField: {id: 'number'}, from: 1, to: 100}
}

export default class App extends React.Component {

  static getInitialProps ({req}) {
    if (req) {
      const store = initStore()
      return get(connection, todoExpression, 'todos')(store.dispatch).then(() => {
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
            <AddTodoForm />
            <Todos />
            <Footer />
          </section>
          <p>Source code on <a href='https://github.com/lipp/next-todos'>GitHub</a></p>
        </div>
      </Provider>
    )
  }
}
