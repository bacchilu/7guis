import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {createRoot} from 'react-dom/client';

import {Counter} from './counter';
import {Crud} from './crud';
import {FlightBooker} from './flight_booker';
import {TempConv} from './temp_conv';
import {Timer} from './timer';

const App = function () {
    return (
        <div className="container">
            <h1>7GUIs</h1>
            <Counter />
            <TempConv />
            <FlightBooker />
            <Timer />
            <Crud />
        </div>
    );
};

createRoot(document.getElementById('app')!).render(<App />);
