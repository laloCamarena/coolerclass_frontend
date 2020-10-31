// npm packages
import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//ReactBS
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

// local packages
import Register from './register';
import Login from "./login";
import Stream from "./stream";
import WatchStream from './watchStream';
import Dashboard from './dashboard';
import LogoSmall from './LogoSmall.png'
import Teacher from './online-teacher.jpg'

//stylesheets
import './App.css';

function getLink()
{
    return window.location.href.split("/",4)[3]
}

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
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
            </main>
            {getLink() === "" &&
                <div>
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                        {getLink() !== "" && <Nav.Link href="\">Inicio</Nav.Link>}
                        <Nav.Link href="\login">Login</Nav.Link>
                        {getLink() !== "register" && <Nav.Link href="\register">Register</Nav.Link>}
                        </Navbar.Collapse>
                    </Navbar>
                    <Row className="justify-content-md-center">
                        <Col xs={8} sm={6} md={6}>
                            <h1 style={{textAlign:"center"}}>A package to make your school classes better</h1>
                            <Image src = {Teacher} rounded/>
                        </Col>
                    </Row>
                </div>
            }
            </BrowserRouter>
        </div>
    );
}

export default App;