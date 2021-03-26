import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import './Login.css';
import {Form, Button} from 'react-bootstrap' // Container for all Rows/Components
import {useState} from 'react'; // React states to store API info

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
    

    return (
        <div id="positioning">
        <Form onSubmit={handleSubmit}>
            <h1 id="heading">Online Examination Web App</h1>
            <Form.Group controlId="formBasicEmail">
                <Form.Label id="label">Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} required/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label id="label">Account Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="pwd" onChange={handleChange} required/>
            </Form.Group>
            
            <Button variant="primary" type="submit" block>
                Submit
            </Button>
        </Form>
        </div>
    
    )
}




export default Login
