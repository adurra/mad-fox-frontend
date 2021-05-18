import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { Routes } from './Routes';

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'


const options = {
    position: positions.TOP_RIGHT,
    timeout: 5000,
    offset: '40px',
    transitions: transitions.SCALE
}



render(
    <AlertProvider template={AlertTemplate} {...options}>
        <Provider store={store}>
            <Routes></Routes>
        </Provider>
    </AlertProvider>
    ,
    document.getElementById('app')
);