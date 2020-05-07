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
import AdminNav from './AdminNavigation'
// import { useParams, useHistory, Link} from 'react-router-dom';
import { useAuth, setTokens } from "../Auth";

const Admin = (props) => {
  const [userLogin, setLoggedIn] = useState(false);
  const [isTimeOut, setTimeOut] = useState(false);
  const [showModal, setModal] = useState(false);
 
  const authTokens = useAuth();

  console.log(authTokens)
  return (

    <div>
      <h2>ADMIN</h2>
      <div>Bienvenue {userLogin.username}</div>


      <ul> 
        <li></li>
      </ul>
      
    </div>
  )
}
export default Admin;