import React, {useEffect} from 'react';
import io from 'socket.io-client';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from "react-router-dom";
import LogoSmall from './LogoSmall.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Stream = (props) => {
    const classes = useStyles();
    const history = useHistory();
    function loggout()
    {
        localStorage.clear()
        history.push('/login');
        window.location.reload();
    }
    useEffect(() => {
        let webcamElement = document.getElementById('webcam');
        let canvasElement = document.getElementById('canvas');
        canvasElement.style.display = 'none';
        let context = canvasElement.getContext('2d');
        canvasElement.width = 512;
        canvasElement.height = 384;
        context.width = 512;
        context.height = 384;

        let interval = null;
        let streaming = false;
        const socket = io('http://localhost:5000/');
        document.getElementById('btn').addEventListener('click', () => {
            if(!streaming) {
                navigator.getUserMedia = (
                    navigator.getUserMedia ||
                    navigator.webkitUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msgGetUserMedia);
                if(navigator.getUserMedia) {
                    navigator.getUserMedia({video: true, audio: true},
                        (stream) => {
                            webcamElement.srcObject = stream;
                            console.log('Camera loaded');
                        },
                        () => {'Could not load the camera'});
                }
                interval = setInterval(() => {
                    context.drawImage(webcamElement, 0, 0, context.width, context.height);
                    socket.emit('stream', canvasElement.toDataURL('image/webp'));
                }, 1000/60);
            } else {
                clearInterval(interval);
                if(webcamElement.srcObject) {
                    webcamElement.srcObject.getTracks().forEach(track => {
                        track.stop();
                    });
                }
            }
            streaming = !streaming;
        });

        return function cleanup() {
            webcamElement.srcObject.getTracks().forEach(track => {
                track.stop();
            });
        }
    }, [])

    return(

        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={() => loggout()}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Row>
                    <Col xs={12} md={8} align="center">
                    <Typography className={classes.title} color="title" gutterBottom>
                        <h1>Stream de Clase</h1>   
                    </Typography>
                        
                        <video id="webcam" autoPlay={true} width="640" height="480"></video>
                        <canvas id="canvas" className="d-none" width="640" height="480"></canvas>
                        {/* <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio> */}
                        <div className="status"></div>
                        <button id="btn">Iniciar stream</button>
                    </Col>
                    <Col xs={6} md={4}>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Información de la clase <br/>
                                    Profesor: Alguien, creo <br/>
                                    Clase: TEMPLATE <br/>
                                    Días: BLABLA

                                </Typography>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Container>


            
        </div>
    );
}
const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
export default Stream;