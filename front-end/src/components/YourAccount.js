import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './YourAccount.css'
import {Form, Container, Button, ButtonGroup} from 'react-bootstrap'; // Container for all Rows/Components
import Swal from 'sweetalert2'
import {useState} from 'react'; // React states to store API info
const Dashboard = () => {
    function handleSubmit(event)
    {
        event.preventDefault(event);
        /*console.log(email, password)*/
    }

    async function handleEmailChange()
    {
        const {value: email} = await Swal.fire
        ({
            title: 'New Email Address',
            input: 'email',
            confirmButtonText: 'Submit',
            showCancelButton: true,
        })

        if (email) {
            Swal.fire(`Entered email: ${email}`)
        }
    }

    async function handlePasswordChange()
    {
        const {value: password} = await Swal.fire
        ({
            title: 'New Password',
            input: 'password',
            confirmButtonText: 'Submit',
            showCancelButton: true,
        })
    }

    return (
        <div>
            <div id='textFormatting'>
                Name: Rikhil Shah
                <br/>
                ID: 00001
                <br/>
                Email: ec19148@qmul.ac.uk &nbsp;
                <Button variant="outline-primary" onClick={handleEmailChange}>
                    Change
                </Button>
                <br/>
                Pasword: ****************** &nbsp; &nbsp;
                <Button variant="outline-primary" onClick={handlePasswordChange}>
                    Change
                </Button>
            </div>
        </div>
    )
    }
    
    export default Dashboard