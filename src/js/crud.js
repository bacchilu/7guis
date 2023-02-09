import React from 'react';

export const Crud = function () {
    const [db, setDb] = React.useState([
        {id: 1, name: 'Hans', surname: 'Emil', selected: true},
        {id: 2, name: 'Max', surname: 'Mustermann', selected: false},
        {id: 3, name: 'Roman', surname: 'Tisch', selected: false},
    ]);
    const [filter, setFilter] = React.useState('');
    const [currentList, setCurrentList] = React.useState(db);
    const [insertForm, setInsertForm] = React.useState({name: '', surname: ''});
    React.useEffect(() => {
        setCurrentList(
            db.filter((item) => item.surname.toLocaleLowerCase().startsWith(filter.trim().toLocaleLowerCase()))
        );
    }, [db, filter]);

    const onFilter = function (e) {
        const data = e.target.value;
        setFilter(data);
    };

    const onChangeInsertForm = function (e) {
        setInsertForm({...insertForm, [e.target.name]: e.target.value});
    };

    const onCreate = function () {
        const [name, surname] = [insertForm.name.trim(), insertForm.surname.trim()];
        if (db.find((item) => item.name === name && item.surname === surname) !== undefined) return;
        setDb([...db, {name, surname, id: db.length + 1, selected: false}]);
    };

    const listItems = currentList.map((item) => {
        const onClick = function () {
            setCurrentList(
                currentList.map(function (e) {
                    return {...e, selected: item.id === e.id};
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
                                    <input className="form-control" value={filter} onChange={onFilter} />
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
                            <button type="button" className="btn btn-warning me-3">
                                Update
                            </button>
                            <button type="button" className="btn btn-danger me-3">
                                Delete
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
