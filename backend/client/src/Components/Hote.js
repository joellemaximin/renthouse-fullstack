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
import { useParams, useHistory } from 'react-router-dom';

const Hote = (props) => {


return (
  <div>
    <h3>Bienvenue chers vacanciers</h3>

    <p>Nous sommes heureux de vous accueillir chez <span>CocoSec et Amanda</span></p>
  </div>
  )
}
export default Hote;
