import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from './Logo.png'
const Login = () => {
    const history = useHistory();
    const initialLoginData = Object.freeze({
        email: "",
        password: "",
    });
    const [loginData, updateLoginData] = useState(initialLoginData);

    const handleChange = (e) => {
        updateLoginData({
            ...loginData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        if(loginData.password === loginData.confirmPassword) {
            let urlEncodedData = "";
            let dataPairs = [];
            let name;
            for(name in loginData) {
                dataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(loginData[name]));
            }
            urlEncodedData = dataPairs.join("&").replace(/%20/g, "+");

            // successful data submission
            xhr.addEventListener("load", (event) => {
                if(parseInt(xhr.response) === 204) {
                    alert("Email or password are incorrect");
                } else {
                    history.push("/login");
                }
            })

            xhr.addEventListener('error', (event) => {
                alert('Something went wrong');
            })

            xhr.open('POST', "http://localhost:5000/register");
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(urlEncodedData);
        }
    };

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Card border='secondary' style={{ width: '30rem',height:'35rem'}} className="text-center">
        <Card.Header><a href="/"><img alt="Logo" src= {Logo} width="30%"/></a></Card.Header>
        <Card.Body>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange = {handleChange} type="email" placeholder="email@example.com"/>
                </Form.Group>
                <br/>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange = {handleChange} type="password" placeholder="Password" />
                </Form.Group>
            </Form>
            <br/><br/><br/>
            <Card.Link style={{margin:"80px"}} href="/register">Register</Card.Link>
            <Button style={{margin:"70px"}} variant="primary" type="submit">Submit</Button>
        </Card.Body>
        
        {/*
            <Form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                /> <br/>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                /> <br/>
                <Button>Submit</Button>
            </Form>
        */}
        </Card>
        </div>
    );
};

export default Login;