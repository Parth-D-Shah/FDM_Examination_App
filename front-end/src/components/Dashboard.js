import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './Dashboard.css';
import {Container, Navbar, Nav, Button} from 'react-bootstrap' // Container for all Rows/Components

const Dashboard = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand className="brand" href="">Online Examination Application</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="links ml-auto ">
                            <Nav.Link className="mr-4" href="">...</Nav.Link>
                            <Nav.Link className="mr-4" href="">...</Nav.Link>
                            <Nav.Link className="mr-4" href="">...</Nav.Link>
                            <Button variant="outline-light">Sign Out</Button>
                        </Nav>
                    </Navbar.Collapse>
                
                </Container>
            </Navbar>
        </div>
    )
}

export default Dashboard
