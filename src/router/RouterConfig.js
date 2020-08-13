import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Home from './../pages/home/Home';
import NotFound from './../pages/notfound/NotFound';
import Profile from '../pages/profile/Profile';

const RouterConfig = () => {
    return(
        <Switch>
            <Route exact path="/" render={() => <Home />} />
            {/* <Route exact path="/profile/:username" render={() => <ProfileDetail />} /> */}
            <Route exact path="/profile" render={() => <Profile />} />
            <Route render={() => <NotFound />} />
        </Switch>
    )
}

export default RouterConfig;