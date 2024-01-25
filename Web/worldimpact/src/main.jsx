import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

/*
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
*/

//const store = createStore(rootReducer, composeWithDevTools());


ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);