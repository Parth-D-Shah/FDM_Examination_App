import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './CreateExam.css';
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap'; // Container for all Rows/Components

const Dashboard = ({loggedInUser}) => {
    function handleSubmit(event)
    {
        event.preventDefault(event);
        /*console.log(email, password)*/
    }


    return (
        
            <div>
            <Form >
                <Form.Group controlId="formBasicQuestion">
                    <Form.Label id="label">Question: </Form.Label>
                    <Form.Control type="textarea" placeholder="Enter question" name="Question"/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Answer: </Form.Label>
                        <Form.Control name="editFname" type="text" placeholder="Enter Answer"/>
                    </Form.Group>
                    <Col sm={1}>
                        <Form.Group>
                            <Form.Label>Marks: </Form.Label>
                            <Form.Control name="editLname" type="number"/>
                        </Form.Group>
                    </Col>
                    <div class="col-auto">
                        <br/>
                        <button class="btn btn-primary mb-2">+</button>
                    </div>
                </Form.Row>

                <ButtonGroup className="btnGroup">
                    <Button className="btnSubmit" variant="primary" type="submit">
                        Create New Question
                    </Button>
                </ButtonGroup>
            </Form>
            </div>

        
    )
    }
    
    export default Dashboard