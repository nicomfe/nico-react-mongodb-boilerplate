import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'

import rootReducer from '../redux/reducers'


function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(promiseMiddleware()),
  ))

  return store
}

export default configureStore
