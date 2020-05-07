import React from 'react';
import './admin.css';
import {
  Nav }
from 'react-bootstrap';
import { useAuth } from "../Auth";
import { useParams, Redirect, useHistory, Link } from 'react-router-dom';

const Navigation = (props) => {

  const handleLogout = () => {    
    props.history.push('/login');
  }

  return(
    <div className="navbar-admin">
        <Nav defaultActiveKey="/" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/">Accueil</Nav.Link>
          </Nav.Item>

          <input type="button" onClick={handleLogout} value="Logout" />


        </Nav>
      </div>
  )
}
export default Navigation;

