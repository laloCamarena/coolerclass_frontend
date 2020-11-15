// npm packages
import React from 'react';
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
// local packages
import LogoSmall from './LogoSmall.png';
import {useHistory} from "react-router-dom";

const Assignment = (props) => {
    function getLink()
    {
        return window.location.href.split("/",5)[4]
    }
    function loggout()
    {
        localStorage.clear()
        history.push('/login');
        window.location.reload();
    }
    const classes = useStyles();
    const history = useHistory();
    const userClasses = JSON.parse(localStorage.getItem('userClasses'));
    const idClase = getLink()
    var filterData = userClasses.filter(item => item.id.toString().includes(idClase));
    var claseInfo = props.location.state
    const [{ data, loading, error }, refetch] = useAxios(
        'http://127.0.0.1:5000//class/'+idClase+'/post'
    )
    console.log(data)
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
                <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
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
    return (
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
                    <Col>
                        <Card className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                {claseInfo.name}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Profesor Enrique Listas x
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
                    {data.map((post) =>
                            <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.pos} color="textSecondary">
                                {post.name}
                                </Typography>
                                <Typography variant="body2" component="p">
                                {post.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Ver Post</Button>
                            </CardActions>
                        </Card>
                        )}
                    </Col>
                    <Col xs={6} md={4}>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Stream activo
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Acceder</Button>
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