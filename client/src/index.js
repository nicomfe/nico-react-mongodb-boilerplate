import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import configureStore from './store/configureStore'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes'

const store = configureStore()

ReactDOM.render(<Provider store={store}>
  <BrowserRouter><Routes /></BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
