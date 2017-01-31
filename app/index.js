'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/app.component';
import configureStore from './configureStore';

// Actions, reducer, and action creators
// See: https://github.com/erikras/ducks-modular-redux 
import reducer from './modules/app.module';

// Create store with middleware
const store = configureStore();

// Render to the DOM
render( 
    <Provider store={store}>
        <App / >,
    </Provider>,
    document.getElementById('react-container')
);

