// Imports from libraries
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap css
import {useState} from 'react'; // React states to store API info
import Login from './components/Login'
import Dashboard from './components/Dashboard'




function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const updateLoggedIn = (loginSuccessful) =>
  {
    setLoggedIn(loginSuccessful)
  }

  return (
    <div className="App">
      
      {loggedIn
        ? <Dashboard />
        : <Login updateLoggedIn = {updateLoggedIn} />
      }

    </div>
  );
}

export default App;
