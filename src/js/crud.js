import React from 'react';

const DB = [
    {id: 1, name: 'Hans', surname: 'Emil'},
    {id: 2, name: 'Max', surname: 'Mustermann'},
    {id: 3, name: 'Roman', surname: 'Tisch'},
];

export const Crud = function () {
    const [db, setDb] = React.useState(DB);
    const [textFilter, setTextFilter] = React.useState('');
    const [currentList, setCurrentList] = React.useState([]);
    const [insertForm, setInsertForm] = React.useState({name: '', surname: ''});
    React.useEffect(() => {
        setCurrentList(
            db.filter((item) => item.surname.toLocaleLowerCase().startsWith(textFilter.trim().toLocaleLowerCase()))
        );
    }, [db, textFilter]);

    const onFilter = function (e) {
        const data = e.target.value;
        setTextFilter(data);
    };

    const onChangeInsertForm = function (e) {
        setInsertForm({...insertForm, [e.target.name]: e.target.value});
    };

    const selectedItem = currentList.find((item) => item.selected);

    const onCreate = function () {
        const [name, surname] = [insertForm.name.trim(), insertForm.surname.trim()];
        if (name === '' || surname === '') return;
        if (db.find((item) => item.name === name && item.surname === surname) !== undefined) return;
        setDb([...db, {name, surname, id: db.length + 1, selected: false}]);
    };

    const onUpdate = function () {
        const [name, surname] = [insertForm.name.trim(), insertForm.surname.trim()];
        if (name === '' || surname === '') return;
        if (db.find((item) => item.name === name && item.surname === surname) !== undefined) return;
        setDb(db.map((item) => (item.id === selectedItem.id ? {...item, name, surname} : item)));
    };

    const onDelete = function () {
        setDb(db.filter((item) => item.id !== selectedItem.id));
    };

    const listItems = currentList.map((item) => {
        const onClick = function () {
            setCurrentList(
                currentList.map(function (e) {
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
        <div className="card text-bg-light m-4">
            <div className="card-body">
                <h5 className="card-title">
                    <a href="https://eugenkiss.github.io/7guis/tasks/#crud" target="_blank">
                        CRUD
                    </a>
                </h5>
                <form>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Filter prefix:</label>
                                <div className="col-sm-9">
                                    <input className="form-control" value={textFilter} onChange={onFilter} />
                                </div>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="list-group">{listItems}</div>
                        </div>
                        <div className="col">
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Name:</label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        name="name"
                                        value={insertForm.name}
                                        onChange={onChangeInsertForm}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-3 col-form-label">Surname:</label>
                                <div className="col-sm-9">
                                    <input
                                        className="form-control"
                                        name="surname"
                                        value={insertForm.surname}
                                        onChange={onChangeInsertForm}
                                    />
                                </div>
                            </div>
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
            </div>
        </div>
    );
};
