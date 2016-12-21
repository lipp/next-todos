import { createStore, applyMiddleware, combineReducers } from 'redux'
import { sorted } from 'redux-jet'
import thunk from 'redux-thunk'

const chainReducers = (reducer, map) => {
  let reducerState
  let mapState
  return (state, action) => {
    reducerState = reducer(reducerState, action)
    mapState = map(reducerState, mapState, action)
    return mapState
  }
}

export default (initialState) => {
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
    active: chainReducers(sortedTodos, todos => todos.filter(filters.active)),
    setAllValue: (state = true, action) => action.type === 'TOGGLE_SET_ALL_VALUE' ? !state : state
  }), applyMiddleware(thunk))
  return store
}
