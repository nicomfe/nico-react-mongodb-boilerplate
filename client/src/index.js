import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import configureStore from './store/configureStore'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
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
registerServiceWorker()
