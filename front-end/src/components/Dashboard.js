import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './Dashboard.css';
import YourAccount from './YourAccount.js'
import {Container, Navbar, Nav, Button, Row, Col, Card, CardDeck} from 'react-bootstrap'; // Container for all Rows/Components

import logo from '../assets/logo-blue.png'
import iconYourAccount from '../assets/your-account-blue.png';
import iconManageUsers from '../assets/manage-users-blue.png';
import iconTicket from '../assets/ticket-blue.png';



const Dashboard = () => {

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="brand">
                        <Row className="align-items-center">
                            <Col className="">
                                <img className="logo img-fluid" src={logo} alt="Logo"/>
                            </Col>
                            <Col className="p-0">
                                Online Examination Application
                            </Col>
                        </Row>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="links ml-auto ">
                            <Nav.Link className="mr-3" href="">Dashboard</Nav.Link>
                            <Nav.Link className="mr-3" href="">Your Account</Nav.Link>
                            <Nav.Link className="mr-3" href="">Manage Users</Nav.Link>
                            <Nav.Link className="mr-4" href="">Manage Tickets</Nav.Link>
                        </Nav>
                        <Button className="outlineButton" variant="outline-primary">Sign Out</Button>
                    </Navbar.Collapse>
                
                </Container>
            </Navbar>

            <Container>

                <Row className="mt-5 pb-3 align-items-center">
                    <Col className="">
                        <div className="welcomeMsg float-left">
                            Welcome, Rikhil Shah
                        </div>
                    </Col>

                    <Col className="">
                        <div className="userDetails float-right">
                            <p className="m-0"> <strong>ID:</strong> 00001 </p>
                            <p className="m-0"> <strong>User: </strong> System Admin </p>
                            <p className="m-0"> <strong>Email: </strong> ec19148@qmul.ac.uk </p>
                        </div>
                    </Col>
                </Row>
                

                {/* <CardDeck className="mt-5">
                    <Card bg="dark" text="white" className="card text-center mr-5">
                        <Card.Img className="pt-3 cardImage mx-auto" variant="top" src={iconYourAccount}/>
                        <Card.Body>
                            <Card.Title> Your Account </Card.Title>
                            <Card.Text>
                                View information about your account and change details.
                            </Card.Text>
                            <div className="d-flex justify-content-center">
                                <Button className="normalButton" variant="primary">Your Account</Button>
                            </div>
                        </Card.Body>
                    </Card>




                    <Card bg="dark" text="white" className="card text-center mr-5">
                        <Card.Img className="pt-3 cardImage mx-auto" variant="top" src={iconManageUsers}/>
                        <Card.Body>
                            <Card.Title> Manage System Users </Card.Title>
                            <Card.Text>
                                Create and manage user accounts for the system.
                            </Card.Text>
                            <div className="d-flex justify-content-center">
                                <Button className="normalButton" variant="primary">Manage Users</Button>
                            </div>
                        </Card.Body>
                    </Card>



                    <Card bg="dark" text="white" className="card text-center">
                        <Card.Img className="pt-3 cardImage mx-auto" variant="top" src={iconTicket}/>
                        <Card.Body>
                            <Card.Title> Manage Support Tickets </Card.Title>
                            <Card.Text>
                                View and resolve support tickets submitted by users.
                            </Card.Text>
                            <div className="d-flex justify-content-center">
                                <Button className="normalButton" variant="primary">Manage Tickets</Button>
                            </div>
                        </Card.Body>
                    </Card>

                    
                
                </CardDeck> */}
                <YourAccount/>
                



            </Container>
        </div>
    )
}

export default Dashboard
