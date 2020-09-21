import React from 'react';
import Register from './register';
import Login from "./login";
import Stream from "./stream";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './App.css';

const App = () => {
    return (
        <div>
            <BrowserRouter>
            {/* <NavBar /> */}
            <main>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/stream" component={Stream} />
                </Switch>
            </main>
            </BrowserRouter>
        </div>
    );
}

export default App;