import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updateMain, updateUser, updateProfile, deleteUser } from '../../redux/actions'
import LocationComponent from './location.component'

const mapStateToProps = (state, props) => ({
  user: state.user,
  main: state.main
})

const mapDispatchToProps = (dispatch, props) => ({
  updateUser (user) {
    dispatch(updateUser(user))
    dispatch(updateProfile(user))
  },
  updateMain (data) {
    dispatch(updateMain(data))
  }
})

const Location = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationComponent)

export default withRouter(Location)
