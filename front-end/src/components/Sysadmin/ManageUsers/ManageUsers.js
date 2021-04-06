import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './ManageUsers.css';
import {Form, Button, InputGroup, Col, Row} from 'react-bootstrap' // Container for all Rows/Components

import {useState} from 'react'; // React states to store API info

import Axios from 'axios' // for handling API Call

const ManageUsers = ({loggedInUser}) => {
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [accountType, setAccountType] = useState(null)
    const [accessKey, setAccessKey] = useState("Generated access key will be displayed here")
    const [createUserSuccessful, setCreateUserSuccessful] = useState(null)
    const [accessKeyColour, setAccessKeyColour] = useState("black")


    function makeid(length) 
    {
        var result = [];
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) 
        {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }
    
    async function handleSubmit(event)
    {
        event.preventDefault(event);

        var key = makeid(5)
        var createUserResponseData = null
        try
        {
            var createUserResponse = await Axios.post("http://localhost:3001/createUser", { fname:fname, lname:lname, accountType:accountType, accessKey:key }, {withCredentials: true})
            createUserResponseData = createUserResponse.data  
            setFname("")
            setLname("")
            setAccountType("")
            setAccessKeyColour("green")
            setAccessKey(createUserResponseData.message+"-"+key)
            setCreateUserSuccessful(true)
        }
        catch (err) 
        { 
            setFname("")
            setLname("")
            setAccountType("")
            setAccessKey("")
            setCreateUserSuccessful(false) 
        }



    }
    
    function handleChange(event)
    {
        var changedBox = event.target.name
        var value = event.target.value
        if (changedBox === "fname"){setFname(value)}
        else if (changedBox === "lname"){setLname(value)}
        else if (changedBox === "accountType"){setAccountType(value)}
    }

    return (
        <div className="manageUsers">
            
            <Row className=" mt-5">
                <Col className="border-right pr-5">
                    <Form onSubmit={handleSubmit}>
                        <p className="formTitle text-center"> Create New User </p>
                        
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="fname" type="text" placeholder="Enter user's first name" required onChange={handleChange} value={fname}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lname" type="text" placeholder="Enter user's last name" required onChange={handleChange} value={lname}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control name="accountType" as="select" required onChange={handleChange} value={accountType}>
                                <option hidden value="">Select user's account type</option>
                                <option>Trainee</option>
                                <option>Trainer</option>
                                <option>System Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Access Key</Form.Label>
                            <InputGroup>
                                <Form.Control style={{color: accessKeyColour}} className="accessKey" type="text" disabled value={accessKey}/>
                                
                                <InputGroup.Append>
                                    <Button type="submit" className="normalButton" variant="primary">Create User</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {createUserSuccessful === true && (
                            <p className="createUserSuccessfulMessage text-center mt-3"> User successfully created, copy access key above </p>
                        )}

                        {createUserSuccessful === false && (
                            <p className="createUserUnsuccessfulMessage text-center mt-3"> User creation unsuccessful, please try again </p>
                        )}



                    </Form>
                </Col>

                <Col className="pl-5">
                    <Form>
                        <p className="formTitle text-center"> Edit Existing User </p>
                        
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user's first name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter user's last name" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control as="select">
                                <option>Trainee</option>
                                <option>Trainer</option>
                                <option>System Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </Form>
                
                
                
                </Col>
            </Row>
        </div>
    )
}

export default ManageUsers
