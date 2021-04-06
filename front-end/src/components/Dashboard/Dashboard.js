import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './Dashboard.css';
import {Container, Navbar, Nav, Button, Row, Col} from 'react-bootstrap'; // Container for all Rows/Components

import ScreenMessage from '../ScreenMessage/ScreenMessage'
import Sysadmin from './Sysadmin'
import YourAccount from '../Sysadmin/YourAccount/YourAccount'
import ManageUsers from '../Sysadmin/ManageUsers/ManageUsers'

import logo from '../../assets/logo-blue.png'


import {useState, useEffect} from 'react'; // React states to store API info
import Axios from 'axios' // for handling API Call



const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useState(null)
    const [chosenScreen, setChosenScreen] = useState("dashboard")

    function padDigits(number, digits) {return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number}

    const changeScreen = (e) => {setChosenScreen(e.target.classList[0])}

    // Effect Hook
    useEffect( () =>
    {
        async function fetchLoggedInUser ()
        {
            var loggedInResponseData = null
            try
            {
                var loggedInResponse = await Axios.get("http://localhost:3001/loggedIn", {withCredentials: true })
                loggedInResponseData = {id:padDigits(loggedInResponse.data.id, 5), email:loggedInResponse.data.email, fname:loggedInResponse.data.fname, lname:loggedInResponse.data.lname, accountType:loggedInResponse.data.accountType}
            }
            catch (err) { loggedInResponseData = err }

            setLoggedInUser(loggedInResponseData)
        }
        
        fetchLoggedInUser()

    }, [])
    
    if (loggedInUser === null) { return(<div> LOADING </div>) }
    
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
                            <Nav.Link className="dashboard mr-3" href="" onClick={changeScreen}>Dashboard</Nav.Link>
                            <Nav.Link className="yourAccount mr-3" href="" onClick={changeScreen}>Your Account</Nav.Link>
                            <Nav.Link className="manageUsers mr-3" href="" onClick={changeScreen}>Manage Users</Nav.Link>
                            <Nav.Link className="manageTickets mr-4" href="" onClick={changeScreen}>Manage Tickets</Nav.Link>
                        </Nav>
                        <Button className="outlineButton" variant="outline-primary">Sign Out</Button>
                    </Navbar.Collapse>
                
                </Container>
            </Navbar>

            
            <Container>

                <ScreenMessage loggedInUser={loggedInUser} currentScreen={chosenScreen}/>
                {loggedInUser.accountType === "System Admin" && chosenScreen === "dashboard" && (<Sysadmin changeScreen={changeScreen} />)}
                {chosenScreen === "yourAccount" && (<YourAccount loggedInUser={loggedInUser}/>)}
                {chosenScreen === "manageUsers" && (<ManageUsers loggedInUser={loggedInUser}/>)}
            
            </Container>


        </div>
    )
}

export default Dashboard
