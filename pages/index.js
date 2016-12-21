import React from 'react'
import Head from 'next/head'
import {Provider} from 'react-redux'
import {get, fetch} from 'redux-jet'
import connection from '../connection'
import initStore from '../store.js'
import Todos from '../containers/Todos'
import AddTodoForm from '../containers/AddTodoForm'
import Footer from '../containers/Footer'

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
