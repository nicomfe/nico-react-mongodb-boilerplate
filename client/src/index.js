import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore'
import './index.css'
import * as serviceWorker from './serviceWorker'
import Routes from './routes'
import theme from './MaterialUITheme'

const store = configureStore()

ReactDOM.render(<Provider store={store}>
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <Routes />
    </MuiThemeProvider>
  </BrowserRouter>
</Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
