import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        if(formData.password === formData.confirmPassword) {
            let urlEncodedData = "";
            let dataPairs = [];
            let name;
            for(name in formData) {
                if(name !== 'confirmPassword') {
                    dataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(formData[name]));
                }
            }
            urlEncodedData = dataPairs.join("&").replace(/%20/g, "+");

            // successful data submission
            xhr.addEventListener("load", (event) => {
                if(parseInt(xhr.response) === 204) {
                    alert("The email submitted is already in use");
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
    );
};

export default Register;