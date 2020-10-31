import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

// Local
import Logo from './Logo.png'

const Register = () => {
    const history = useHistory();
    const initialFormData = Object.freeze({
        email: "",
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/register', {
            ...formData
        })
        .then(history.push('/login'))
        .catch(console.log);
    };

    return (
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Card border='secondary' style={{ width: '30rem',height:'35rem'}} className="text-center">
        <Card.Header><a href="/"><img alt="Logo" src= {Logo} width="30%"/></a></Card.Header>
        <Card.Body>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control name="name" onChange = {handleChange} placeholder="Name"></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" onChange = {handleChange} placeholder="email@example.com"></Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange = {handleChange} type="password" placeholder="Password"></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="confirmPassword" onChange = {handleChange} type="password" placeholder="Confirm"></Form.Control>
                    </Col>
                </Row>
                <Card.Link style={{margin:"80px"}} href="/login">Login</Card.Link>
                <Button style={{margin:"70px"}} variant="primary" type="submit">Submit</Button>
            </Form>
            <br/><br/>
        </Card.Body>
        
        {/* 
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="email"
                placeholder="email@example.com"
                onChange={handleChange}
            /> <br/>
            <input
                type="text"
                name="name"
                placeholder="Juan Perez"
                onChange={handleChange}
            /> <br/>
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            /> <br/>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
            /> <br/>
            <button>Submit</button>
        </form>
        */}
        </Card>
        </div>
        
    );
};

export default Register;