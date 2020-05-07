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
// import Photos from './Photos';
import { useParams, useHistory } from 'react-router-dom';
import Gites from './Gites';
import Paiement from './svg/payment-card-v2.png';
import './gite.css'

const Home = (props) => {


return (
  <div>
    <h3>AFFICHER LES IMAGES ICI</h3>
    {/* <Photos/> */}

    <Gites />

    <div className='PaymentSection'>Paiement possible: 
      <img className="paiement" src={Paiement} alt="logo" />
    </div>
  </div>
  )
}
export default Home;
