import CatList from '../cat-list/cat-list';
import CatInfo from '../cat-info/cat-info';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import React from 'react';

export default function AppRoute() {
    return (
        <Router>
            <Switch>
                <Route path={'/:catId'}><CatInfo/></Route>
                <Route path={'/'}><CatList/></Route>
            </Switch>
        </Router>
    );
}
