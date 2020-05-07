import React from 'react'; 
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

const Footer = (props) => {


return (
  <div className="footer">
    <hr/>
    <h4>Gite de Lucie</h4>
    <small>Suivez nous sur les réseaux sociaux</small>
  </div>
  )
}
export default Footer;
