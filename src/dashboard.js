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
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'

// local packages
import Paimon from './asd.png';
import LogoSmall from './LogoSmall.png'


const Dashboard = () => {
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
            
            <Row>
                <Col>
                    <Link to ="/login">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={Paimon}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Paimon
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    I, I wanna fucking die
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.root}>
                                <Button size="small" color="primary">
                                Hell yea
                                </Button>
                                <Button size="small" color="primary">
                                Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={Paimon}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Seld Help
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                It's not a meme
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.root}>
                            <Button size="small" color="primary">
                            Free me 
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
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
                            image={Paimon}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Paimon
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                I, I wanna fucking die
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.root}>
                            <Button size="small" color="primary">
                            Hell yea
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to ="/login">
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image={Paimon}
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Paimon
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    I, I wanna fucking die
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.root}>
                                <Button size="small" color="primary">
                                Hell yea
                                </Button>
                                <Button size="small" color="primary">
                                Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Link>
                </Col>
                <Col>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={Paimon}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Seld Help
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                It's not a meme
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.root}>
                            <Button size="small" color="primary">
                            Free me 
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
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
                            image={Paimon}
                            title="Contemplative Reptile"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Paimon
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                I, I wanna fucking die
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className={classes.root}>
                            <Button size="small" color="primary">
                            Hell yea
                            </Button>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </Col>
            </Row>
            
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