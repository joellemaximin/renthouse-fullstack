import React, { useState } from "react";

import Navigation from './Components/Navigation';
import Home from './Components/Home';
import ShowGite from './Components/ShowGite';
// import AddPhoto from './Components/Auth/AddPhoto';
import Activities from './Components/Activities';
// import Booking from './Components/Bookings';
import Hote from './Components/Hote';
// import NoMatchRoutes from './Components/NoMatch';
import Footer from './Components/Footer';
import Admin from './Components/Auth-Admin/Admin';
import Login from './Components/Auth-Admin/Login';
// import Signup from './Components/Auth-Admin/Signup';
import ProtectedRoute from './Components/Protected';
import {Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from "./Components/Auth";
import { Container } from 'react-bootstrap'

const App = (props) => {
  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ||  '')
  // useState(localStorage.getItem('authTokens') ||  '');

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }   
  // <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>


  return(
    <div className="App">
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>

          <Navigation />

          <Container>

          <Route exact path='/' component={Home} />

          <Route exact path="/show-gite" component={ShowGite} />
          
          <Route exact path="/contact-hote" component={Hote} />

          <Route exact path="/tourisme" component={Activities} />
          
          {/* <Route exact path="/photos" component={Photos} /> */}

          {/* <Route exact path="/reservation" component={Booking} /> */}
          
          {/* <Route render={(path='?') => <h1>404: page not found</h1>} /> */}
          
          <Route path="/login" component={Login} />
          

          <ProtectedRoute
            path="/admin" 
            component={Admin} 
          /> 

          
          {/* <Route path="*" component={() => "ERROR 404"} /> */}
          
          <Footer/>

          </Container>
        </Router>

      </AuthContext.Provider>
    </div>
  )
}

export default App;

