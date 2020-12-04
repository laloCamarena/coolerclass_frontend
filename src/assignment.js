// npm packages
import React, {useState} from 'react';
//ReactBS
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import useAxios from 'axios-hooks';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Form from 'react-bootstrap/Form';
// local packages
import LogoSmall from './LogoSmall.png';
import {useHistory} from "react-router-dom";

const Assignment = (props) => {
    const [showForm, setShowForm] = useState(false);
    const classes = useStyles();
    const userClasses = JSON.parse(localStorage.getItem('userClasses'));
    const idClase = getLink()
    var filterData = userClasses.filter(item => item.id.toString().includes(idClase));
    var claseInfo = props.location.state
    const [{ data, loading, error }, refetch] = useAxios(
        'http://127.0.0.1:5000/class/'+idClase+'/post'
    )
    function getLink()
    {
        return props.match.params.id
    }
    function loggout()
    {
        localStorage.clear()
        history.push('/login');
        
    }

    const userData = JSON.parse(localStorage.getItem('userData'))
    var userInfo = props.location.userData;
    const initialPostData = Object.freeze({
        name: '',
        description: '',
        informative: true
    });
    const [postData, setPostData] = useState(initialPostData);
    const history = useHistory();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox'
            ? !e.target.checked
            : e.target.value.trim();
        setPostData({
            ...postData,
            [e.target.name]: value
        });
        console.log(value);
    }

    const createPost = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/class/${idClase}/post`,
        { ...postData }
        ).then(response => {
            window.location.reload();
          }).catch(error => {
              console.log(error)
          });
        setShowForm(!showForm);
    }

    if(props.location.state === undefined && userData === null)
    {
        history.push('/login');
        window.location.reload();
    } else
    {
        userInfo = userData
    }
    
    if(props.location.state === undefined && filterData.length !== 0)
    {
        claseInfo=filterData[0]
    }
    else if (props.location.state === undefined && filterData.length === 0){
        history.push('/dashboard');
        window.location.reload();
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
        //history.push('/login');
        //window.location.reload();
        console.log(error)
    }
    if(!loading)
    {
        localStorage.setItem('class'+idClase+'Posts', JSON.stringify(data))
    }
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/dashboard"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link onClick={() => loggout()}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        <Card className={classes.root} variant="outlined">
                            <CardHeader
                                title={claseInfo.name}
                                subheader={claseInfo.teacher}
                                className={classes.headerMain}
                            />
                            <CardContent>
                                <Typography variant="body2" component="p">
                                Class ID: {getLink()}<br/>
                                Class Hours: {claseInfo.startTime} - {claseInfo.endTime}<br/>
                                Days: {claseInfo.days}
                                <br />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        {userInfo.user_type !== "student" ? [
                            (showForm ? 
                                <Card className={classes.root} variant="outlined">
                                    <CardContent >
                                        <Form>
                                            <Form.Group controlId="formTitle">
                                                <Form.Control type="text" name="name" onChange={handleChange} placeholder="Titulo de la publicación"/>
                                            </Form.Group>
                                            <Form.Group controlId="formComment">
                                                <Form.Control as="textarea" rows={3} type="text" onChange={handleChange} name="description" placeholder="Mensaje"  />
                                            </Form.Group>
                                            <Form.Group controlId="formCheckbox">
                                                <Form.Check type="checkbox" label="Es tarea" name="informative" onChange={handleChange} />
                                            </Form.Group>
                                            <CardActions>
                                            {/* -----------------------------------------------------
                                                Acá falta que le agregues la función para postearlo 
                                                y regresas el showForm a false.
                                            -----------------------------------------------------   */}
                                            <Button  onClick={createPost} size="small">Post</Button>
                                            <Button  onClick={() => setShowForm(!showForm)} size="small">Cancel</Button>
                                        </CardActions>
                                        </Form> 
                                    </CardContent>
                                </Card>
                                : 
                                <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                                    <CardContent >
                                        <CardActions>
                                            <Button onClick={() => setShowForm(!showForm)}  size="small">Post</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>)
                        ] : null}
                        
                        {data.map((post) =>
                        <>
                            <Card key={post.id} className={classes.root} variant="outlined">
                                 <CardHeader
                                    avatar={
                                    <IconButton aria-label="delete">
                                        <AssignmentIcon />
                                    </IconButton>
                                }
                                title={post.name}
                                className={classes.headerAssign}
                                />
                                <CardContent>
                                <Typography variant="body2" component="p">
                                {post.description}
                                <br />
                                </Typography>
                                </CardContent>
                                <CardActions >
                                    <Button onClick={event => {
                                                    history.push({
                                                        pathname: '/'+claseInfo.id+'/post/'+post.id,
                                                        state: post,
                                                        userInfo: userInfo });
                                                    window.location.reload();}} size="small">
                                            Ver Post</Button>
                                </CardActions>
                            </Card>
                            <br/>
                        </>
                        )}
                    </Col>
                    {userInfo.user_type === "student" ?
                    <Col xs={6} md={4}>
                    <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Class Stream
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button onClick={event => {
                                                    history.push({
                                                        pathname: '/watchstream',
                                                         });
                                                    window.location.reload();}} size="small">
                                            Ver Post</Button>
                        </CardActions>
                    </Card>
                    </Col> : 
                    <Col xs={6} md={4}>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Start Stream
                                </Typography>
                            </CardContent>

                            <CardActions>
                            <Button onClick={event => {
                                                    history.push({
                                                        pathname: '/stream', });
                                                    window.location.reload();}} size="small">
                                            Ver Post</Button>
                            </CardActions>
                        </Card>
                    </Col> }




                    
                </Row>
            </Container>
        </div>
    );
};
const useStyles = makeStyles({
    headerMain: {
        background: '#6a52eb',
        textAlign: 'center'
    },
    headerAssign: {
        background: '#8DA4F7',
        textAlign: 'center'
    },
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

export default Assignment;