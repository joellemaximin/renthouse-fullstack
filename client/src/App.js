import React, {useState, useEffect} from "react";

import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Footer from './Components/Footer';
import ShowGite from './Components/ShowGite';
// import AddPhoto from './Components/Auth/AddPhoto';
import Activities from './Components/Activities';
// import AddActivity from './Components/AddActivity';

// import Booking from './Components/Bookings';
import Hote from './Components/Hote';
// import NoMatchRoutes from './Components/NoMatch';
import PrivateRoute from './Components/privateRoute/PrivateRoute';
import AdminRoute from './Components/privateRoute/AdminRoute';
import Login from './Components/Auth-Admin/Login';
import Signup from './Components/Auth-Admin/Signup';
import AdminDashboard from './Components/Auth-Admin/Admin';
import Dashboard from './Components/Dashboard/Dashboard';

import {Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from "./Components/Auth";
import { Container } from 'react-bootstrap'
import Axios from 'axios'
const App = (props) => {
  
  // const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  // const [authTokens, setAuthTokens] = useState(localStorage.getItem('auth-token') ||  '')
  // useState(localStorage.getItem('auth-token') ||  '');
 
  // const setTokens = (data) => {
  //   localStorage.setItem("auth-token", JSON.stringify(data));
  //   setAuthTokens(data);
  //   console.log()
  // }


  // // <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        '/auth-admin/login',
        null,
        {
          headers: {"auth-token": token}
        }
      );
      if (tokenRes.data){
       const userRes = await Axios.get('/auth-admin/profile', {
        headers: {"auth-token": token},
      });
      setUserData({
        token,
        user: userRes.data
      })
    }
  }


    checkLoggedIn();
  }, []) 

  //authTokens, setAuthTokens: setTokens

  return(
    <div className="App">
      <AuthContext.Provider value={{userData, setUserData}}>
        <Router>

          <Navigation />

          <Container>

          <Route exact path='/' component={Home} />

          <Route exact path="/show-gite" component={ShowGite} />
          
          <Route exact path="/contact-hote" component={Hote} />

          <Route exact path="/tourisme" component={Activities} />
          
          {/* <Route exact path="/photos" component={Photos} /> */}
          
          {/* <Route render={(path='?') => <h1>404: page not found</h1>} /> */}
          
          <Route path="/login" component={Login} />
          
          <Route path="/signup" component={Signup} />
  

          {/*
          
          <PrivateRoute path="/user/bookings" component={Bookings} />

          <PrivateRoute path="/user/reservation" component={AddBooking} /> 
          
          <PrivateRoute path="/user/addComment" component={AddComment} /> 

          <PrivateRoute exact path="/reservation" component={Booking} />

          */}

          
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          
          <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
     
          {/* <AdminRoute path="/create/category" exact component={AddCategory} /> */}
          
          {/* <AdminRoute path="/create/gite" exact component={AddGite} /> */}
          
          {/* <AdminRoute path="/create/photos" exact component={AddGite} /> */}

          {/* <Route path="*" component={() => "ERROR 404"} /> */}
          
          <Footer/>

          </Container>
        </Router>

      </AuthContext.Provider>
    </div>
  )
}

export default App;

