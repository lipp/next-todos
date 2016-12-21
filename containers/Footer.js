import Footer from '../components/Footer'
import {connect} from 'react-redux'
import {call} from 'redux-jet'
import connection from '../connection'

const actions = {
  setFilter: filter => ({type: 'SET_FILTER', filter}),
  clearCompleted: () => call(connection, 'todo/clearCompleted')
}

const mapStateToProps = (state) => ({
  actives: state.active.length,
  selectedFilter: state.display.filter
})

export default connect(mapStateToProps, actions)(Footer)
