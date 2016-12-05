import React from 'react'
import Head from 'next/head'
import { Provider, connect } from 'react-redux'
import { call, set, get, fetch } from 'redux-jet'
import initStore from '../store.js'
import DisconnectedAddTodoForm from '../components/AddTodoForm'
import DisconnectedTodos from '../components/Todos'
import DisconnectedFooter from '../components/Footer'

const connection = {url: 'wss://todos-demo.now.sh'}

const AddTodoForm = connect(() => ({connection}), {call})(DisconnectedAddTodoForm)

const mapStateToTodosProps = state => ({
  todos: state.display.todos,
  connection
})

const Todos = connect(mapStateToTodosProps, {set, call})(DisconnectedTodos)

const setFilter = (filter) => ({
  type: 'SET_FILTER',
  filter
})

const mapStateToFooterProps = (state) => ({
  connection,
  active: state.active,
  completedIds: state.completed.map(todo => todo.value.id),
  selectedFilter: state.display.filter
})

const Footer = connect(mapStateToFooterProps, {setFilter, call})(DisconnectedFooter)

const todoExpression = {
  path: {startsWith: 'todo/#'},
  sort: {
    byValueField: {id: 'number'},
    from: 1,
    to: 100
  }
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
