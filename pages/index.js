import React from 'react'
import Head from 'next/head'
import {Provider} from 'react-redux'
import initStore from '../store.js'
import Todos from '../containers/Todos'
import AddTodoForm from '../containers/AddTodoForm'
import Footer from '../containers/Footer'

export default class App extends React.Component {

  static getInitialProps ({req}) {
    if (req) {
      const store = initStore()
      return store.getInitialState().then(initialState => ({initialState, store}))
    }
  }

  componentDidMount () {
    this.store.resume()
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
