import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './ManageTickets.css';
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap'; // Container for all Rows/Components

import Swal from 'sweetalert2'

const ManageTickets = ({loggedInUser}) => {
    async function handleTicketSubmit(event)
    {
        event.preventDefault(event);
        Swal.fire({
            title: 'Are you sure the ticket has been solved?',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div>
            <div id='box'>
                Ticket ID: 00001<br />
                User ID: 00003<br />
                Account Type: Trainee<br />
                Ticket Type: Extenuating Circumstances<br />
                Futher Information: Unable to attend the Exam this week due to being ill.<br />
                <Form onSubmit={handleTicketSubmit} col=''>
                    <ButtonGroup className="btnGroup">
                        <Button className="btnSubmit" variant="primary" type="submit">
                            Solved
                        </Button>
                    </ButtonGroup>
                </Form>
            </div>
            <br />
            <div id='box'>
                Ticket ID: 00002<br />
                User ID: 00004<br />
                Account Type: Trainee<br />
                Ticket Type: Extenuating Circumstances<br />
                Futher Information: I had internet issues so i was not able to do the exam today.<br />
                <Form onSubmit={handleTicketSubmit} col=''>
                    <ButtonGroup className="btnGroup">
                        <Button className="btnSubmit" variant="primary" type="submit">
                            Solved
                        </Button>
                    </ButtonGroup>
                </Form>
            </div>
            <br />
            <div id='box'>
                Ticket ID: 00003<br />
                User ID: 00002<br />
                Account Type: Trainer<br />
                Ticket Type: Bug/Error<br />
                Futher Information: I recieved the following error when trying to access a students exam results: HTTP ERROR 401 (UNAUTHORIZED).<br />
                <Form onSubmit={handleTicketSubmit} col=''>
                    <ButtonGroup className="btnGroup">
                        <Button className="btnSubmit" variant="primary" type="submit">
                            Solved
                        </Button>
                    </ButtonGroup>
                </Form>
            </div>
        </div>
    )
}
    
export default ManageTickets