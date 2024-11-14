import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {createRoot} from 'react-dom/client';

import {CircleDrawer} from './apps/circle_drawer';
import {Counter} from './apps/counter';
import {Crud} from './apps/crud';
import {FlightBooker} from './apps/flight_booker';
import {TempConv} from './apps/temp_conv';
import {Timer} from './apps/timer';
import {Container} from './libs/bootstrap';

const App = function () {
    return (
        <Container>
            <h1>7GUIs</h1>
            <Counter />
            <TempConv />
            <FlightBooker />
            <Timer />
            <Crud />
            <CircleDrawer />
        </Container>
    );
};

createRoot(document.getElementById('app')!).render(<App />);
