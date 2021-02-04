import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from 'react-bootstrap';
import AppRoute from './route/app-route';

function App() {
    return (
        <React.Fragment>
            <Container className="my-5">
                <AppRoute />
            </Container>
        </React.Fragment>
    );
}

export default App;
