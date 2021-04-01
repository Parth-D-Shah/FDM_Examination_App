import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './Login.css';
import {Form, Button, ButtonGroup, Col, Row} from 'react-bootstrap' // Container for all Rows/Components
import {useState} from 'react'; // React states to store API info
import logo from '../assets/logo-blue.png'
import Swal from 'sweetalert2'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    function handleSubmit(event)
    {
        event.preventDefault(event);
        console.log(email, password)
    }

    function handleChange(event)
    {
        var changedBox = event.target.name
        var value = event.target.value

        if (changedBox === "email")
        {
            setEmail(value)
        }

        else if (changedBox === "pwd")
        {
            setPassword(value)
        }
    }

    async function handleAccessCode()
    {
        const {value: userAccessCode} = await Swal.fire
        ({
            title: 'Access Code',
            input: 'text',
            confirmButtonText: 'Submit',
            showCancelButton: true,
            inputValidator: (code) => 
            {
              if (code !== "test") 
              {
                return 'Please enter a valid access code'
              }
            }
        })

        if (userAccessCode)
        {
            console.log("accepted")
        } 
    }
    

    return (
        <div id="positioning">

            <Form onSubmit={handleSubmit}>
                <Row className="align-items-center mb-4">
                    <Col className="d-flex justify-content-center" xs="auto">
                        <img className="loginLogo img-fluid" src={logo} alt="Logo"/>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <h1 id="heading">Online Examination Application</h1>
                    </Col>
                </Row>
                
                <Form.Group controlId="formBasicEmail">
                    <Form.Label id="label">Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} required/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label id="label">Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="pwd" onChange={handleChange} required/>
                </Form.Group>
                
                <ButtonGroup className="btnGroup">
                    <Button className="btnSubmit" variant="primary" type="submit">
                        Login
                    </Button>

                    <Button className="btnAccessCode ml-5" variant="outline-primary" onClick={handleAccessCode}>
                        Have an access key?
                    </Button>
                </ButtonGroup>
            </Form>
        </div>
    
    )
}




export default Login
