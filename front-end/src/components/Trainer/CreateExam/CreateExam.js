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
                    <Form.Label id="label">Question</Form.Label>
                    <Form.Control type="text" placeholder="Enter question" name="Question"/>
                </Form.Group>

                <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Answer</Form.Label>
                                <Form.Control name="editFname" type="text" placeholder="Enter Answer"/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Marks</Form.Label>
                                <Form.Control name="editLname" type="number" placeholder="Enter Marks"/>
                            </Form.Group>
                </Form.Row>

                <ButtonGroup className="btnGroup">
                    <Button className="btnSubmit" variant="primary" type="submit">
                        Add New Answer
                    </Button>

                    <Button className="btnAccessCode ml-5" variant="primary">
                        Create New Question
                    </Button>
                </ButtonGroup>
            </Form>
            </div>

        
    )
    }
    
    export default Dashboard