import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './AccessKey.css';
import {Container, Form, Row, Col, Button, ButtonGroup} from 'react-bootstrap' // Container for all Rows/Components

import logo from '../../assets/logo-blue.png'

const AccessKey = () => {
    return (
        <div className="AccessKey d-flex align-items-center vh-100 ">
            <Container className="w-25">

                
                {/* <Row className="align-items-center mb-4">
                    <Col className="d-flex justify-content-center p-0 m-0" xs="auto">
                        <img className="loginLogo img-fluid" src={logo} alt="Logo"/>
                    </Col>
                    <Col className="d-flex justify-content-center text-center p-0 m-0">
                        <h1 className="m-0" id="heading">Online Examination Application</h1>
                    </Col>
                </Row> */}

                <Row className="align-items-center">
                    <Col className="d-flex justify-content-center">
                        <p className="accessKeyHeading"> Set your email/password: </p>
                    </Col>
                </Row>
                
                <Form className="mt-4">


                    <Form.Row className="">
                        <Form.Group as={Col} className="">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="editFname" type="text" placeholder="User's first name" readOnly required />
                        </Form.Group>

                        <Form.Group as={Col} className="">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="editLname" type="text" placeholder="User's last name" readOnly required />
                        </Form.Group>
                    </Form.Row>


                    <Form.Group  className="">
                        <Form.Label>ID</Form.Label>
                        <Form.Control name="editID" type="text" placeholder="User's ID" readOnly />
                    </Form.Group>

                    <Form.Group className="">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control name="editAccountType" type="text" placeholder="User's account type" readOnly required />
                    </Form.Group>

                    
                        <Form.Group  className="">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="editEmail" type="email" placeholder="User's email"  required />
                        </Form.Group>

                        <Form.Group  className="">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="editPassword" type="password" required />
                        </Form.Group>
                    

                    <ButtonGroup className="mt-2">
                        <Button type="submit" className="normalButton" variant="primary"> Confirm </Button>
                    </ButtonGroup>
                    
                    
                </Form>
            </Container>
        </div>
    )
}

export default AccessKey
