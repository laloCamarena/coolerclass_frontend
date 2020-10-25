// npm packages
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

// local packages
import Register from './register';
import Login from "./login";
import Stream from "./stream";
import WatchStream from './watchStream';

//stylesheets
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
                    <Route path="/watch-stream" component={WatchStream} />
                </Switch>
            </main>
            </BrowserRouter>
        </div>
    );
}

export default App;