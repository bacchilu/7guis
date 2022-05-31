import React from 'react';
import {createRoot} from 'react-dom/client';

import {Counter} from './counter';
import {TempConv} from './temp_conv';
import {FlightBooker} from './flight_booker';

const App = function () {
    return (
        <>
            <Counter />
            <TempConv />
            <FlightBooker />
        </>
    );
};

createRoot(document.getElementById('app')).render(<App />);
