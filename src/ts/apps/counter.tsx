import React from 'react';

import {Card, Form} from '../libs/bootstrap';

export const Counter = function () {
    const [value, setValue] = React.useState(0);

    const onSubmit = function () {
        setValue(value + 1);
    };

    return (
        <Card title="Counter" url="https://eugenkiss.github.io/7guis/tasks/#counter">
            <Form onSubmit={onSubmit}>
                <div className="row row-cols-lg-auto">
                    <div>
                        <input className="form-control" value={value} disabled />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary">
                            Count
                        </button>
                    </div>
                </div>
            </Form>
            <p className="card-text mt-4">Nothing particular here: this is a classic React test.</p>
        </Card>
    );
};
