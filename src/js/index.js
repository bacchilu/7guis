import {createRoot} from 'react-dom/client';

import {Counter} from './counter';
import {Crud} from './crud';
import {FlightBooker} from './flight_booker';
import {TempConv} from './temp_conv';
import {Timer} from './timer';

const App = function () {
    return (
        <>
            <Counter />
            <TempConv />
            <FlightBooker />
            <Timer />
            <Crud />
        </>
    );
};

createRoot(document.getElementById('app')).render(<App />);
