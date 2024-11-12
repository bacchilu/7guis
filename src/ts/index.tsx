import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {createRoot} from 'react-dom/client';

import {Counter} from './counter';
import {Crud} from './crud';
import {FlightBooker} from './flight_booker';
import {Container} from './libs/bootstrap';
import {TempConv} from './temp_conv';
import {Timer} from './timer';

const App = function () {
    return (
        <Container>
            <h1>7GUIs</h1>
            <Counter />
            <TempConv />
            <FlightBooker />
            <Timer />
            <Crud />
        </Container>
    );
};

createRoot(document.getElementById('app')!).render(<App />);
