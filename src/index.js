import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import reducer from './reducer';
import mySaga from './sagas'

import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

// run the saga
sagaMiddleware.run(mySaga);

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
