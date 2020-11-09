// npm packages
import React, {useState,useEffect} from 'react';
import useAxios from 'axios-hooks'
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

function getclasses () {

}
const Dashboard = (props) => {
    const history = useHistory();
    if(props.location.state === undefined)
    {
        history.push('/login');
        window.location.reload();
    }
    const imgs = [a1,a2,a3];
    const userInfo = props.location.state;
    const [userID,setUserID] =useState(userInfo.id);
    const classes = useStyles();
    const [{ data, loading, error }, refetch] = useAxios(
        'http://127.0.0.1:5000/user/'+userID+'/classes'
    )
    if (loading) return(
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
                </Row>
            </Grid>
            
        </div>
    )
    if (error) {
        history.push('/login');
    }
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
                    {data.map((clase) =>
                        <Col>
                        <Card className={classes.root}>
                            <CardActionArea>
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
                                        Arturo Emanuel Quezada Ruvalcaba
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.root}>
                            </CardActions>
                        </Card>
                    </Col>
                    )}
                    
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