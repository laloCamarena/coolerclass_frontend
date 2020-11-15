import React, {useState, useEffect} from 'react';
import Image from 'react-bootstrap/Image'
import io from 'socket.io-client';
import asd from './asd.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";
import LogoSmall from './LogoSmall.png';
import { makeStyles } from '@material-ui/core/styles';

const WatchStream = () => {
    const [img, setImg] = useState(asd);
    const history = useHistory();
    function loggout()
    {
        localStorage.clear()
        history.push('/login');
        window.location.reload();
    }
    const classes = useStyles();
    useEffect(() => {
        const socket = io('http://localhost:5000/');
        socket.on('get-stream', (image) => {
            setImg(image);
        });
    }, []);

    if(img == asd)
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={() => loggout()}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )

    return (
        <div style={{
            backgroundColor: 'black', textAlign:'center'
          }}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={() => loggout()}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            <Image className={classes.img} src={img} fluid/>
        </div>
    );
}
const useStyles = makeStyles({
    img: {
        height: 'auto',
        width: '60%',
        objectFit: 'cover'
    }
  });
export default WatchStream;