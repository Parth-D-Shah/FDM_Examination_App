// Imports from libraries
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import {Container} from 'react-bootstrap' // Container for all Rows/Components
import {useState, useEffect} from 'react'; // React states to store API info

import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Container className="">
        <Login />
      </Container>
    </div>
  );
}

export default App;
