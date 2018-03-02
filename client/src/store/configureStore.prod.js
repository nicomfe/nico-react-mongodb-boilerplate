import { createStore, applyMiddleware, compose } from 'redux'

import promiseMiddleware from '../redux/utils/promiseMiddleware'
import rootReducer from '../redux/reducers'


function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(promiseMiddleware),
  ))

  return store
}

export default configureStore
