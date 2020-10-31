import React, {useState} from "react";
import axios from 'axios';
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
        console.log(e.target.value);
        updateLoginData({
            ...loginData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const onSuccess = ({data}) => {
        history.push('/dashboard');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/login', {
            ...loginData
        })
        .then(onSuccess)
        .catch(console.log);
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
                    <Form.Control onChange = {handleChange} type="email" name="email" placeholder="email@example.com"/>
                </Form.Group>
                <br/>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange = {handleChange} type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Card.Link style={{margin:"80px"}} href="/register">Register</Card.Link>
                <Button style={{margin:"70px"}} variant="primary" type="submit">Submit</Button>
            </Form>
            <br/><br/><br/>
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