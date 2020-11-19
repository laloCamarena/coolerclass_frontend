// npm packages
import React, {useState} from 'react';
//ReactBS
import DescriptionIcon from '@material-ui/icons/Description';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import Navbar from 'react-bootstrap/Navbar';
import Card from '@material-ui/core/Card';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import useAxios from 'axios-hooks'
// local packages
import { CardActions } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import LogoSmall from './LogoSmall.png';

const Post = (props) => {
    function getLink()
    {
        return props.match.params.id;
    }
    function getClass()
    {
        return props.match.params.assignment;
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
    const classes = useStyles();
    const [{ data, loading, error }, refetch] = useAxios(
        'http://127.0.0.1:5000/post/'+getLink()+'/file/'+userInfo.id
    )
    const userClasses = JSON.parse(localStorage.getItem('userClasses'));
    var filterData = userClasses.filter(item => item.id.toString().includes(getClass()));
    const classPosts = JSON.parse(localStorage.getItem('class'+filterData[0].id+'Posts'));
    var filterPosts = classPosts.filter(item => item.id.toString() === getLink());
    var postInfo = props.location.state;
    if(props.location.state === undefined && filterPosts.length !== 0)
    {
        postInfo=filterPosts[0]
    }
    if(loading) return (
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
                                title={postInfo.name}
                                subheader={filterData[0].name}
                                className={classes.headerMain}
                            />
                        </Card>
                    </Col>
                </Row>
                <br/>
                {!postInfo.informative ?[
                    (userInfo.user_type!== "student" ? 
                    <Row className="justify-content-center">
                        <Col xs={8} md={8}>
                            <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {postInfo.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <Row >
                        <Col xs={8} md={8}>
                            <Card style={{ display:'flex' }} className={classes.root} variant="outlined">
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {postInfo.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Col>
                        <Col xs={4} md={4}>
                            <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                                <CardContent  >
                                    {data !== undefined ? 
                                    <>
                                    <IconButton style={{ paddingLeft:'38%' }} aria-label="file">
                                        <DescriptionIcon className={classes.largeIcon}/>
                                        
                                    </IconButton>
                                    <a  href={data[0].attachment}><p style={{ display:'flex', justifyContent:'center' }}>{data[0].name}</p></a> 
                                    <Form>
                                        <Form.Group>
                                            <Form.File id="exampleFormControlFile1" label="Modify File" />
                                        </Form.Group>
                                        <CardActions className={classes.r}>
                                            <Button size="small">Upload</Button>
                                        </CardActions>
                                    </Form>
                                    </>
                                    : <Form>
                                        <Form.Group>
                                            <Form.File id="exampleFormControlFile1" label="Upload" />
                                        </Form.Group>
                                        <CardActions className={classes.r}>
                                            <Button size="small">Upload</Button>
                                        </CardActions>
                                    </Form> }
                                </CardContent>
                            </Card>
                        </Col> 
                    </Row>)]
                : 
                <Row className="justify-content-center">
                    <Col xs={8} md={8}>
                        <Card style={{ display:'flex', justifyContent:'center' }} className={classes.root} variant="outlined">
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {postInfo.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>}
                {userInfo.user_type !== "student" ?
                <Row>
                    <Col>
                    <ListGroup variant="flush">
                        {data.map((file) =>
                            <ListGroup.Item key={file.name}>{file.name}<a href={file.attatchment}> {file.attatchment}</a></ListGroup.Item>
                        )}
                    </ListGroup>
                    </Col>
                </Row> : null}
                
            </Container>
        </div>
        
    );
   
};
const useStyles = makeStyles({
     headerMain: {
        background: '#BBC7F2',
        textAlign: 'center'
    },
    largeIcon: {
        width: 60,
        height: 60,
    },    
    r: {
        justifyContent: 'center',
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

export default Post;