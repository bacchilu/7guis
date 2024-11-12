import React from 'react';

import {Card} from './libs/bootstrap';

interface FormData {
    name: string;
    surname: string;
}

interface DBItem {
    id: number;
    name: string;
    surname: string;
    selected: boolean;
}

const DB = [
    {id: 1, name: 'Hans', surname: 'Emil', selected: false} as DBItem,
    {id: 2, name: 'Max', surname: 'Mustermann', selected: false} as DBItem,
    {id: 3, name: 'Roman', surname: 'Tisch', selected: false} as DBItem,
];

const TextFilter: React.FC<{value: string; setValue: (v: string) => void}> = function ({value, setValue}) {
    const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    };

    return (
        <>
            <label className="col-sm-3 col-form-label">Filter prefix:</label>
            <div className="col-sm-9">
                <input className="form-control" value={value} onChange={onChange} />
            </div>
        </>
    );
};

const Form: React.FC<{insertForm: FormData; setInsertForm: (v: FormData) => void}> = function ({
    insertForm,
    setInsertForm,
}) {
    const onChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        setInsertForm({...insertForm, [e.target.name]: e.target.value} as FormData);
    };

    return (
        <>
            <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Name:</label>
                <div className="col-sm-9">
                    <input
                        className="form-control"
                        name="name"
                        value={insertForm.name}
                        onChange={onChange}
                        autoComplete="off"
                    />
                </div>
            </div>
            <div className="row mb-3">
                <label className="col-sm-3 col-form-label">Surname:</label>
                <div className="col-sm-9">
                    <input className="form-control" name="surname" value={insertForm.surname} onChange={onChange} />
                </div>
            </div>
        </>
    );
};

export const Crud = function () {
    const [db, setDb] = React.useState(DB);
    const [textFilter, setTextFilter] = React.useState('');
    const [insertForm, setInsertForm] = React.useState<FormData>({name: '', surname: ''} as FormData);

    const selectedItem = db.find((item) => item.selected);
    const filteredItems = db.filter((item) =>
        item.surname.toLocaleLowerCase().startsWith(textFilter.trim().toLocaleLowerCase())
    );

    const onCreate = function () {
        const [name, surname] = [insertForm.name.trim(), insertForm.surname.trim()];
        if (name === '' || surname === '') return;
        if (db.find((item) => item.name === name && item.surname === surname) !== undefined) return;
        setDb([...db, {id: db.length + 1, name, surname, selected: false}]);
    };

    const onUpdate = function () {
        const [name, surname] = [insertForm.name.trim(), insertForm.surname.trim()];
        if (name === '' || surname === '') return;
        if (db.find((item) => item.name === name && item.surname === surname) !== undefined) return;
        setDb(db.map((item) => (item.id === selectedItem!.id ? {...item, name, surname} : item)));
    };

    const onDelete = function () {
        setDb(db.filter((item) => item.id !== selectedItem!.id));
    };

    const listItems = filteredItems.map((item) => {
        const onClick = function () {
            setDb(
                db.map(function (e) {
                    return {...e, selected: item.id === e.id && !item.selected};
                })
            );
        };

        return (
            <button
                key={item.id}
                type="button"
                className={`list-group-item list-group-item-action${item.selected ? ' active' : ''}`}
                onClick={onClick}
            >
                {item.surname}, {item.name}
            </button>
        );
    });
    return (
        <Card title="CRUD" url="https://eugenkiss.github.io/7guis/tasks/#crud">
            <form>
                <div className="row mb-3">
                    <div className="col">
                        <div className="row mb-3">
                            <TextFilter value={textFilter} setValue={setTextFilter} />
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="list-group">{listItems}</div>
                    </div>
                    <div className="col">
                        <Form insertForm={insertForm} setInsertForm={setInsertForm} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <button type="button" className="btn btn-primary me-3" onClick={onCreate}>
                            Create
                        </button>
                        <button
                            type="button"
                            className="btn btn-warning me-3"
                            disabled={selectedItem === undefined}
                            onClick={onUpdate}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger me-3"
                            disabled={selectedItem === undefined}
                            onClick={onDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </Card>
    );
};
