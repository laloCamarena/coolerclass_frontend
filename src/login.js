import React, {useState} from "react";
import {useHistory} from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
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
            <button>Submit</button>
        </form>
    );
};

export default Login;