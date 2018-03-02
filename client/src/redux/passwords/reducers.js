import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import { GENERATE_PASSWORD_SUCCESS } from './actions'

const initialState = Immutable.fromJS({
  lastGenerated: []
})

export default createReducer(initialState, {
  [GENERATE_PASSWORD_SUCCESS]: (state, action) => {
    return state.set('lastGenerated', Immutable.fromJS(action.payload))
  }
})
