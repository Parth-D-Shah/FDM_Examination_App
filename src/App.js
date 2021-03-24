// Imports from libraries
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import {Container, Button} from 'react-bootstrap' // Container for all Rows/Components
import {useState} from 'react'

import Login from './components/Login'
import CreateUser from './components/CreateUser'




function App() {
  const [screen, setScreen] = useState("login")

  function createUser()
  {
    setScreen("createUser")
  }


  return (
    <div className="App">
      <Container className="mt-5">
        {screen === "login" && (
          <div>
            <Login />
            <Button className="mt-5" onClick={createUser}> Create User </Button>
          </div>
          )}

        {screen === "createUser" && (
          <CreateUser />
        )}



      </Container>
    </div>
  );
}

export default App;
