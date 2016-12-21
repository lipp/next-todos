import AddTodoForm from '../components/AddTodoForm'
import {connect} from 'react-redux'
import {call} from 'redux-jet'
import connection from '../connection'

const actions = {
  addTodo: (title) => call(connection, 'todo/add', [title]),
  setAllCompleted: (completed) => call(connection, 'todo/setCompleted', [completed]),
  toggleSetAllValue: () => ({type: 'TOGGLE_SET_ALL_VALUE'})
}

const mapStateToProps = state => ({
  setAllValue: state.setAllValue
})

export default connect(mapStateToProps, actions)(AddTodoForm)
