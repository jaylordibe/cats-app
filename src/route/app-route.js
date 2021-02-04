import CatListComponent from '../components/cat-list/cat-list.component';
import CatInfoComponent from '../components/cat-info/cat-info.component';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import React from 'react';

export default function AppRoute() {
    return (
        <Router>
            <Switch>
                <Route path={'/:catId'}><CatInfoComponent/></Route>
                <Route path={'/'}><CatListComponent/></Route>
            </Switch>
        </Router>
    );
}
