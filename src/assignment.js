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
// local packages
import LogoSmall from './LogoSmall.png';

import {useHistory} from "react-router-dom";


const Assignment = (props) => {
    const history = useHistory();
    const claseInfo = props.location.state
    if(props.location.state === undefined)
    {
        history.push('/login');
        window.location.reload();
    }
    const classes = useStyles();
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="\login">Logout</Nav.Link>
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
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={8}>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Post 1
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Tarea
                                </Typography>
                                <Typography variant="body2" component="p">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                                consetetur sadipscing elitr
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Subir tarea</Button>
                            </CardActions>
                        </Card>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Post 2
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                Archivo
                                </Typography>
                                <Typography variant="body2" component="p">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                                At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, 
                                consetetur sadipscing elitr
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Descargar archivo</Button>
                            </CardActions>
                        </Card>
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