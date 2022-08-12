import './App.css';
import RoomCreator from './Component/RoomCreator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Viewer from './Component/Viewer';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import AuthenticationPage from './Component/AuthenticationPage';
import PrivateRoute from './Component/PrivateRoute';
import HomePage from './Component/HomePage';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavItem } from 'react-bootstrap';

function App() {


  const [loginstatus, setLoginstatus] = useState('');

  const authenticate = (user) => {
    setLoginstatus(user);
    console.log(user + ' ' + loginstatus);
  }
  const logOff = () => {
    Axios.post('http://localhost:3001/api/logoff').then((resp) => {
      setLoginstatus('');
    });
  }

  useEffect(() => {
    Axios.get('http://localhost:3001/api/login').then((response) => {
      if (response.data.loggedIn) {
        setLoginstatus(response.data.loggedUser[0].username);
      }
    });
  }, []);


  return (
    <>

      <div className='fixed-top'>

        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="https://superb-churros-56b022.netlify.app/">MLM</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="https://superb-churros-56b022.netlify.app/">Home</Nav.Link>
              <Nav.Link href="https://superb-churros-56b022.netlify.app/reporter">Reporter</Nav.Link>
              <Nav.Link href="https://superb-churros-56b022.netlify.app/viewer">Viewer</Nav.Link>
              <Nav.Link href="https://superb-churros-56b022.netlify.app/login">
                {loginstatus === '' ? <p>You are not Logged In Click To Login</p> : <p> Logged as: {loginstatus}</p>}
              </Nav.Link>
              <NavItem className='justify-content-end'> {loginstatus === '' ? null : <button onClick={logOff}>LOG OFF</button>}</NavItem>
            </Nav>
          </Container>
        </Navbar>

      </div>

      <div> {/* show logoff button and name of user */}

        <Router>
          <Routes>

            <Route path='/reporter'
              element={
                <PrivateRoute status={loginstatus}>
                  <RoomCreator auth={authenticate} />
                </PrivateRoute>
              } />
            <Route path='/viewer'
              element={
                <PrivateRoute status={loginstatus}>
                  <Viewer />
                </PrivateRoute>
              } />
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<AuthenticationPage auth={authenticate} />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}





export default App;
