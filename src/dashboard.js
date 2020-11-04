// npm packages
import React from 'react';

//ReactBS
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Grid from '@material-ui/core/Grid';
import {useHistory} from "react-router-dom";
// local packages
import a1 from './1.jpg';
import a2 from './2.jpg';
import a3 from './3.jpg';
import LogoSmall from './LogoSmall.png';

const Dashboard = (props) => {
    console.log(typeof(props.location.state))
    const history = useHistory();
    if(typeof(props.location.state.first_name)==='undefined')
    {
        history.push('/login');
    }
    const classes = useStyles();
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home"><img src ={LogoSmall} alt ="CoolerClass" width = "50%"/></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="\register">Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            <Grid container spacing={5} style={{ padding: 20 }}>
                <Row>
                    <Col>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={a1}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Metodos Matematicos 1
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Enrique Eduardo Gomez Arias
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.root}>
                            </CardActions>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={a3}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Programación 1
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Arturo Emanuel Quezada Ruvalcaba
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.root}>
                            </CardActions>
                        </Card>
                    </Col>
                    <Col>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={a2}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                    Historia de la computación
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Jose Manuel Martinez Gonzalez
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.root}>
                            </CardActions>
                        </Card>
                    </Col>
                </Row>
            </Grid>
            
        </div>
        
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