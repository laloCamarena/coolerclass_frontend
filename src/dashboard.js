// npm packages
import React, {useState} from 'react';
import useAxios from 'axios-hooks'
import axios from 'axios';
//ReactBS
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Grid from '@material-ui/core/Grid';
import {useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';

import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

// local packages
import a1 from './1.jpg';
import a2 from './2.jpg';
import a3 from './3.jpg';
import LogoSmall from './LogoSmall.png';

const Dashboard = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const initialJoinClassData = Object.freeze({
        id: "",
        password: "",
    });
    const [joinClassData, updateJoinClassData] = useState(initialJoinClassData);
    const initialCreateClassData = Object.freeze({
        name: "",
        startTime: "",
        endTime: "",
        days: "",
        password: "",
        confirmPassword: "",
    });
    const [createClassData, updateCreateClassData] = useState(initialCreateClassData);

    const history = useHistory();
    const userData = JSON.parse(localStorage.getItem('userData'))
    var userInfo = props.location.state;
    if(props.location.state === undefined && userData === null)
    {
        history.push('/login');
        window.location.reload();
    } else
    {
        userInfo = userData
    }
    const imgs = [a1,a2,a3];
    
    const [userID, setUserID] = useState(userInfo.id);
    const classes = useStyles();
    const [{ data, loading, error }, refetch] = useAxios(
        'http://127.0.0.1:5000/user/'+userID+'/classes'
    )
    function loggout()
    {
        localStorage.clear()
        history.push('/login');
        window.location.reload();
    }

    const handleJoinClass = (e) => {
        updateJoinClassData({
            ...joinClassData,
            [e.target.name]: e.target.value
        });
    }

    const handleCreateClass = (e) => {
        updateCreateClassData({
            ...createClassData,
            [e.target.name]: e.target.value
        });
    }

    const joinClass = async (e) => {
        await axios.post(`http://localhost:5000/class/${userID}/enroll`, {
            ...joinClassData
        })
        .catch(console.log);
        handleClose();
    }

    const createClass = async (e) => {
        if (createClassData.password === createClassData.confirmPassword) {
            await axios.post(`http://localhost:5000/class/${userID}/create`, {
                ...createClassData
            })
            .catch(console.log);
            handleClose();
        } else {
            alert('Las contraseñas deben ser idénticas');
        }
    }

    if (loading) return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/dashboard"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={() => loggout()}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
    if (error) {
        history.push('/login');
        window.location.reload();
    }
    if(!loading)
    {
        localStorage.setItem('userClasses', JSON.stringify(data))
    }
    return (
        <>
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/dashboard"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <IconButton onClick={handleShow} aria-label="delete">
                    <AddCircleOutlineIcon />
                </IconButton>
                <Nav.Link onClick={() => loggout()}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            <Grid container spacing={5} style={{ padding: 20 }}>
                <Row>
                    {data.map((clase) =>
                        <Col key={clase.id}>
                            <Card className={classes.root}>
                                <CardActionArea onClick={event => {
                                                    history.push({
                                                        pathname: '/assignment/'+clase.id,
                                                        state: clase,
                                                        userInfo: userInfo });
                                                    window.location.reload();}}>
                                    <CardMedia
                                    component="img"
                                    height="140"
                                    image={imgs[Math.floor(Math.random() * imgs.length)]}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        {clase.name}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {clase.teacher}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Grid>
        </div>
        {userInfo.user_type === "student" ?
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Join Class</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                
                    <Form.Group>
                        <Form.Control type="text" name="id" id="fidClase" placeholder="ID de la clase" onChange={handleJoinClass} /> <br/>
                        <Form.Control type="password" name="password" id="fidClase" placeholder="Contraseña de la clase" onChange={handleJoinClass} />
                    </Form.Group>
                    {/* -----------------------------------------------------
                        Acá falta que le agregues la función para Unirse,
                        no estoy seguro que esta estructura del Form en Modal funcione xd
                    -----------------------------------------------------   */}
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={joinClass}>Join</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        : 
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Create Class</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                
                    <Form.Group>
                        <Form.Control type="text" name="name" value={createClassData.name} placeholder="Nombre de la clase" onChange={handleCreateClass} /> <br/>
                        <Form.Control type="text" name="startTime" value={createClassData.startTime} placeholder="12:00" onChange={handleCreateClass} /> <br/>
                        <Form.Control type="text" name="endTime" value={createClassData.endTime} placeholder="14:00" onChange={handleCreateClass} /> <br/>
                        <Form.Control type="text" name="days" value={createClassData.days} placeholder="Días en los que se imparte la clase" onChange={handleCreateClass} /> <br/>
                        <Form.Control type="password" name="password" value={createClassData.password} placeholder="Contraseña de la clase" onChange={handleCreateClass} /> <br/>
                        <Form.Control type="password" name="confirmPassword" value={createClassData.confirmPassword} placeholder="Confirmar Contraseña" onChange={handleCreateClass} /> <br/>
                    </Form.Group>
                    {/* -----------------------------------------------------
                        Acá falta que le agregues la función para crear clase,
                        Lo mismo que en la parte de arriba krnal
                    -----------------------------------------------------   */}
                
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={createClass}>Create</Button>
                </Modal.Footer>
            </Form>
        </Modal> }
    </>
    );
   
};

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft:10,
    },
  });

export default Dashboard;