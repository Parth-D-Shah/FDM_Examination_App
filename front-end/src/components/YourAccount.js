import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import {Form, Container, Button, ButtonGroup} from 'react-bootstrap'; // Container for all Rows/Components

import {useState} from 'react'; // React states to store API info
const Dashboard = () => {
    const [oldpassword, setOldPassword] = useState("")
    const [password, setNewPassword] = useState("")


    function handleSubmit(event)
    {
        event.preventDefault(event);
        console.log(oldpassword, password)
    }

    function handleChange(event)
    {
        var changedBox = event.target.name
        var value = event.target.value

        if (changedBox === "oldpassword")
        {
            setOldPassword(value)
        }

        else if (changedBox === "pwd")
        {
            setNewPassword(value)
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label id="label">Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Current Password" name="oldpassword" onChange={handleChange} required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label id="label">New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter New Password" name="pwd" onChange={handleChange} required/>
                </Form.Group>

                <Form.Group>
                    <Form.Label id="label">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm New Password" name="pwd" onChange={handleChange} required/>
                </Form.Group>
                
                <ButtonGroup className="btnGroup">
                    <Button className="btnSubmit" variant="primary" type="submit">
                        Confirm
                    </Button>
                </ButtonGroup>
            </Form>
        </div>
    )
    }
    
    export default Dashboard