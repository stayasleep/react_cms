import React, { Component } from 'react';
import './App.css';
import Add from './components/add';
import EntryBody from './components/entry_body';

class App extends Component {

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <Add />
                    <EntryBody />
                </div>
            </div>
        );
    }
}

export default App;
