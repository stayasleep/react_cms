import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import './App.css';
import Headers from './components/headers';
import Add from './components/add';
import EntryBody from './components/entry_body';

const App = () => (
    <Grid>
        <Row>
            <Headers/>
            <Add/>
            <EntryBody/>
        </Row>
    </Grid>
);
export default App;