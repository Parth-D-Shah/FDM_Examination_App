import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './ManageUsers.css';
import {Form, Button, InputGroup, Col, Row, FormGroup} from 'react-bootstrap' // Container for all Rows/Components

import {useState, useEffect} from 'react'; // React states to store API info

import Axios from 'axios' // for handling API Call

const ManageUsers = ({loggedInUser}) => {
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [accountType, setAccountType] = useState(null)
    const [accessKey, setAccessKey] = useState(null)
    const [createUserSuccessful, setCreateUserSuccessful] = useState(null)
    const [accessKeyColour, setAccessKeyColour] = useState("black")

    const [editID, setEditID] = useState(null)
    const [editEmail, setEditEmail] = useState(null)
    const [editFname, setEditFname] = useState(null)
    const [editLname, setEditLname] = useState(null)
    const [editAccountType, setEditAccountType] = useState(null)
    const [editAccessKey, setEditAccessKey] = useState(null)
    const [editUserSuccessful, setEditUserSuccessful] = useState(null)
    const [editUserAccesKeySuccessful, setEditUserAccesKeySuccessful] = useState(null)
    const [editAccessKeyColour, setEditAccessKeyColour] = useState("black")
    const [systemUsers, setSystemUsers] = useState(null)

    function padDigits(number, digits) {return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number}

    // Effect Hook
    useEffect( () =>
    {
        async function fetchSystemUsers ()
        {
            var systemUsersResponseData = null
            try
            {
                var systemUsersResponse = await Axios.get("http://localhost:3001/getUsers", {withCredentials: true })
                systemUsersResponseData = systemUsersResponse.data
                console.log(systemUsersResponseData)
                setSystemUsers(systemUsersResponseData)
            }
            catch (err) 
            { 
                systemUsersResponseData = err.response 
            }
        }
        
        fetchSystemUsers()

    }, [])


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
    
    async function handleSubmitCreateUser(event)
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

        else if (changedBox === "editEmail"){setEditEmail(value)}
        else if (changedBox === "editFname"){setEditFname(value)}
        else if (changedBox === "editLname"){setEditLname(value)}
        else if (changedBox === "editAccountType"){setEditAccountType(value)}
    }

    function handleChangeChosenAccount(event)
    {
        var value = event.target.value
        var currentChosenUser = systemUsers[value]

        setEditID(padDigits(currentChosenUser.id, 5))
        setEditEmail(currentChosenUser.email)
        setEditFname(currentChosenUser.fname)
        setEditLname(currentChosenUser.lname)
        setEditAccountType(currentChosenUser.accountType)
        


    }

    if (systemUsers === null) { return(<div> LOADING </div>) }
    
    return (
        <div className="manageUsers">
            
            <Row className=" mt-5">
                <Col className="border-right pr-5">
                    <Form onSubmit={handleSubmitCreateUser}>
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

                        <Form.Row className="mt-4">
                            <FormGroup as={Col} className="" xs="auto">
                                <Button type="submit" className="normalButton" variant="primary">Create User</Button>
                            </FormGroup>

                            <FormGroup as={Col} className="" xs="auto">
                                <Form.Control style={{color: accessKeyColour}} className="accessKey" plaintext readOnly value={accessKey}/>
                            </FormGroup>
                        </Form.Row>

                        {createUserSuccessful === true && (
                            <p className="createUserSuccessfulMessage text-center mt-1"> User successfully created, copy access key above </p>
                        )}

                        {createUserSuccessful === false && (
                            <p className="createUserUnsuccessfulMessage text-center mt-1"> User creation unsuccessful, please try again </p>
                        )}



                    </Form>
                </Col>

                <Col className="pl-5">
                    <Form>
                        <p className="formTitle text-center"> Edit Existing User </p>

                        <Form.Group>
                            <Form.Label>Select User</Form.Label>
                            <InputGroup>
                                <Form.Control name="editChosenAccount" as="select" required onChange={handleChangeChosenAccount}>
                                    <option hidden value="">Select user's account</option>
                                    {systemUsers.map((systemUser, index) =>
                                    (
                                        <option value={index}>{systemUser.fname + " " + systemUser.lname}</option>
                                    ))}
                                </Form.Control>
                                
                                <InputGroup.Append>
                                    <Button type="submit" className="normalButton" variant="primary">Generate Access Key</Button>
                                </InputGroup.Append>
                            
                            </InputGroup>
                        </Form.Group>

                    </Form>

                    <Form>
                        <Form.Row className="">
                            <Form.Group as={Col} className="">
                                <Form.Label>ID</Form.Label>
                                <Form.Control name="editID" type="text" placeholder="User's ID" readOnly onChange={handleChange} value={editID}/>
                            </Form.Group>

                            <Form.Group as={Col} className="">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="editEmail" type="email" placeholder="User's email" required onChange={handleChange} value={editEmail}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className="">
                            <Form.Group as={Col} className="">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="editFname" type="text" placeholder="User's first name" required onChange={handleChange} value={editFname}/>
                            </Form.Group>

                            <Form.Group as={Col} className="">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="editLname" type="text" placeholder="User's last name" required onChange={handleChange} value={editLname}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group className="">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Control name="editAccountType" as="select" required onChange={handleChange} value={editAccountType}>
                                <option hidden value="">Select user's account</option>
                                <option>Trainee</option>
                                <option>Trainer</option>
                                <option>System Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Row className="mt-4">
                            <FormGroup as={Col} className="" xs="auto">
                                <Button type="submit" className="normalButton" variant="primary">Confirm Edits</Button>
                            </FormGroup>

                            <FormGroup as={Col} className="" xs="auto">
                                <Form.Control style={{color: editAccessKeyColour}} className="accessKey" plaintext readOnly value={editAccessKey}/>
                            </FormGroup>
                        </Form.Row>

                        {editUserSuccessful === true && (
                            <p className="createUserSuccessfulMessage text-center mt-1"> User successfully edited </p>
                        )}

                        {editUserSuccessful === false && (
                            <p className="createUserUnsuccessfulMessage text-center mt-1"> User edit unsuccessful, please try again </p>
                        )}

                        {editUserAccesKeySuccessful === true && (
                            <p className="createUserSuccessfulMessage text-center mt-1"> User edit access key successfully created, copy access key above </p>
                        )}

                        {editUserAccesKeySuccessful === false && (
                            <p className="createUserSuccessfulMessage text-center mt-1"> User edit access key creation unsuccessful, please try again </p>
                        )}

                    </Form>
                
                
                
                </Col>
            </Row>
        </div>
    )
}

export default ManageUsers
