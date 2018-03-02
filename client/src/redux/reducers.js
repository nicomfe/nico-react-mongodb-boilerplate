import { combineReducers } from 'redux-immutablejs'

import auth from './auth/reducers'
import password from './passwords/reducers'

const rootReducer = combineReducers({
  auth,
  password,
})

export default rootReducer
