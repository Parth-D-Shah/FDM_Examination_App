import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap'; // Container for all Rows/Components

import Swal from 'sweetalert2'
import './GetSupport.css'

const GetSupport = ({loggedInUser}) => {
    async function handleTicketSubmit(event)
    {
        event.preventDefault(event);
        Swal.fire(
            'Thank You For Reporting!',
            'Ticket Sent',
            'success'
          )

    }

    return (
        <div>
            <Form onSubmit={handleTicketSubmit}>
                <Form.Group className="">
                    <Form.Label>Ticket Type</Form.Label>
                    <Form.Control name="ticketType" as="select" required>
                        <option hidden value="">Select Ticket Type</option>
                        <option>Bug/Error</option>
                        <option>Extenuating Circumstances</option>
                    </Form.Control>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Futher Information: </Form.Label>
                        <Form.Control name="editFname" type="text" placeholder="Enter Answer" required/>
                    </Form.Group>

                </Form.Row>

                <ButtonGroup className="btnGroup">
                    <Button className="btnSubmit" variant="primary" type="submit">
                        Submit
                    </Button>
                </ButtonGroup>
            </Form>
        </div>
    )
    }
    
    export default GetSupport