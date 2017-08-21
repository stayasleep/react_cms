import React, { Component } from 'react';
import './App.css';
import Add from './components/add';
import Entries from './components/entries';

class App extends Component {

    render() {

        return (
            <div className="container-fluid">
                <div className="row">
                    <Add />
                    <Entries />
                </div>
            </div>
        );
    }
}

export default App;
