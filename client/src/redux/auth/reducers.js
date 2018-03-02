import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

const initialState = Immutable.fromJS({
  currentUser: {}
})

export default createReducer(initialState, {})
