// npm packages
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

//ReactBS
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

// local packages
import Register from './register';
import Login from "./login";
import Stream from "./stream";
import WatchStream from './watchStream';
import LogoSmall from './LogoSmall.png'


//stylesheets
import './App.css';

function getLink()
{
    return window.location.href.split("/",4)[3]
}

const App = () => {
    return (
        <div>
            {getLink() !== "login" &&
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
            <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                {getLink() !== "" && <Nav.Link href="\">Inicio</Nav.Link>}
                <Nav.Link href="\login">Login</Nav.Link>
                 
                {getLink() !== "register" && <Nav.Link href="\register">Register</Nav.Link>}
                </Navbar.Collapse>
            </Navbar>
            }
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
            {getLink() === "" &&
                <div>
                    {
                    // Acá es solo la página de inicio, no sé si vamos a poner algo lmao
                    }
                </div>
            }
            </BrowserRouter>
        </div>
    );
}

export default App;