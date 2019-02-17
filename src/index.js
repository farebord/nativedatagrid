import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';
import { Provider } from 'react-redux'
import configureStore from './store';

ReactDOM.render(
    <Provider store={configureStore()}>
        <Example />
    </Provider>,
    document.getElementById('root')
);
