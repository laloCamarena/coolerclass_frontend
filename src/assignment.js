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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useAxios from 'axios-hooks'
import Form from 'react-bootstrap/Form';
// local packages
import LogoSmall from './LogoSmall.png';
import {useHistory} from "react-router-dom";

const Assignment = (props) => {
    function getLink()
    {
        return props.match.params.id
    }
    function loggout()
    {
        localStorage.clear()
        history.push('/login');
        window.location.reload();
    }
    const userData = JSON.parse(localStorage.getItem('userData'))
    var userInfo = props.location.userData;
    const history = useHistory();
    if(props.location.state === undefined && userData === null)
    {
        history.push('/login');
        window.location.reload();
    } else
    {
        userInfo = userData
    }
    const [showForm,setShowForm] = useState(false);
    const classes = useStyles();
    const userClasses = JSON.parse(localStorage.getItem('userClasses'));
    const idClase = getLink()
    var filterData = userClasses.filter(item => item.id.toString().includes(idClase));
    var claseInfo = props.location.state
    const [{ data, loading, error }, refetch] = useAxios(
        'http://127.0.0.1:5000/class/'+idClase+'/post'
    )
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
        history.push('/login');
        window.location.reload();
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
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                {claseInfo.name}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {claseInfo.teacher}
                                </Typography>
                                <Typography variant="body2" component="p">
                                Hora clase: {claseInfo.startTime} - {claseInfo.endTime}<br/>
                                Dias: {claseInfo.days}
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
                                                <Form.Control type="text" name="titulo" id="ftitle" placeholder="Titulo de la publicación"/>
                                            </Form.Group>
                                            <Form.Group controlId="formComment">
                                                <Form.Control as="textarea" rows={3} type="text" name="comentario" id="fcomentario" placeholder="Mensaje"  />
                                            </Form.Group>
                                            <CardActions>
                                            {/* -----------------------------------------------------
                                                Acá falta que le agregues la función para postearlo 
                                                y regresas el showForm a false.
                                            -----------------------------------------------------   */}
                                            <Button  onClick={() => setShowForm(false)} size="small">Publicar</Button>
                                        </CardActions>
                                        </Form> 
                                    </CardContent>
                                </Card>
                                : 
                                <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                                    <CardContent >
                                        <CardActions>
                                            <Button onClick={() => setShowForm(true)}  size="small">Publicar</Button>
                                        </CardActions>
                                    </CardContent>
                                </Card>)
                        ] : null}
                        
                        {data.map((post) =>
                            <Card key={post.id} className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.pos} color="textSecondary">
                                    {post.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    {post.description}
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
                        )}
                    </Col>
                    <Col xs={6} md={4}>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Active Stream
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button size="small">Enter</Button>
                            </CardActions>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
   
};
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

export default Assignment;