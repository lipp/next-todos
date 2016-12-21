import {createStore, applyMiddleware, combineReducers} from 'redux'
import {sorted, get, fetch} from 'redux-jet'
import thunk from 'redux-thunk'
import connection from './connection'

const query = {
  path: {startsWith: 'todo/#'},
  sort: {byValueField: {id: 'number'}, from: 1, to: 100}
}

const reducer = initialState => combineReducers({
  todos: sorted('todos', initialState ? initialState.todos : []),
  filter: (state = 'all', action) => action.type === 'SET_FILTER' ? action.filter : state,
  setAllValue: (state = true, action) => action.type === 'TOGGLE_SET_ALL_VALUE' ? !state : state
})

export default (initialState) => {
  const store = createStore(reducer(initialState), applyMiddleware(thunk))

  if (initialState) {
    store.resume = () => fetch(connection, query, 'todos')(store.dispatch)
  } else {
    store.getInitialState = () => {
      return get(connection, query, 'todos')(store.dispatch).then(() => store.getState())
    }
  }
  return store
}
