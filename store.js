import {createStore, applyMiddleware, combineReducers} from 'redux'
import {sorted} from 'redux-jet'
import thunk from 'redux-thunk'

export default (initialState) => {
  const initialTodos = initialState ? initialState.todos : []

  const store = createStore(combineReducers({
    todos: sorted('todos', initialTodos),
    filter: (state = 'all', action) => action.type === 'SET_FILTER' ? action.filter : state,
    setAllValue: (state = true, action) => action.type === 'TOGGLE_SET_ALL_VALUE' ? !state : state
  }), applyMiddleware(thunk))
  return store
}
