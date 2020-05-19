import React, { useState , useEffect} from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label,
  Button }
from 'reactstrap';
// import { useParams, useHistory, Link} from 'react-router-dom';
// import { useAuth, setTokens } from "../Auth";

const Dashboard = (props) => {
  const [userLogin, setLoggedIn] = useState(false);
  const [isTimeOut, setTimeOut] = useState(false);
  const [showModal, setModal] = useState(false);

  // const { setAuthTokens } = useAuth();

  // const logOut = async () => {
  //   fetch('/booking/logout')
	// 		.then(res => res.json())
	// 		.catch(err => {
	// 			console.log(err)
	// 	})
  // }


  return (

    <div>
      <h2>UTILISATEUR</h2>
      <div>Bienvenue {userLogin.username}</div>
      {/* <Button onClick={logOut()}>Log out</Button> */}


      <ul> 
        <li></li>
      </ul>
      
    </div>
  )
}
export default Dashboard;