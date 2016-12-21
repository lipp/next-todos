import Todos from '../components/Todos'
import {connect} from 'react-redux'
import {call, set} from 'redux-jet'
import connection from '../connection'

const filters = {
  completed: todo => todo.value.completed,
  active: todo => !todo.value.completed,
  all: todo => todo
}

const mapStateToProps = state => ({
  todos: state.todos.filter(filters[state.filter])
})

const actions = {
  setCompleted: (path, completed) => set(connection, path, {completed}),
  setTitle: (path, title) => set(connection, path, {title}),
  remove: id => call(connection, 'todo/remove', [id])
}

export default connect(mapStateToProps, actions)(Todos)
