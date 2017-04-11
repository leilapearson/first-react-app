'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { createLogger } from 'redux-logger';
import thunk  from 'redux-thunk';
import reducer from './reducers/index';
import App from './components/App';

const logger = createLogger({
    collapsed: true
})

// Create store with middleware
const store = createStore(
    reducer,
    applyMiddleware(thunk, apiMiddleware, logger)
);

// Render to the DOM
render( 
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('react-container')
);
