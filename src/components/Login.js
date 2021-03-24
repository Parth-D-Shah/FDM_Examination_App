import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import {Row, Col, Card, Form, Button} from 'react-bootstrap' // Container for all Rows/Components
import {useState, useEffect} from 'react'; // React states to store API info

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
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} required/>
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="pwd" onChange={handleChange} required/>
        </Form.Group>
        
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    
    )
}




export default Login
