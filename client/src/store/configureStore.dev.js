import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from 'immutable'
import { createLogger } from 'redux-logger'

import promiseMiddleware from '../redux/utils/promiseMiddleware'
import rootReducer from '../redux/reducers'

function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    Immutable.fromJS(initialState),
    compose(
      applyMiddleware(
        promiseMiddleware,
        createLogger({
          stateTransformer: (state) => {
            return state.toJS()
          },
          collapsed: () => {
            return true
          },
        }),
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../redux/reducers', () => {
      const nextRootReducer = require('../redux/reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
