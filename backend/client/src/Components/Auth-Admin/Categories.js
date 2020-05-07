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

const AddGite = (props) => {
const [showLoading, setShowLoading] = useState(true);
// const [location, classes, history] = props;
const [inputs, setInputs] = useState(
{title: '', collection: '', author: '', oeuvre: '', editor: ''}
);
const [categories, setCategory] = useState([]);
const history = useHistory()



return (
  <div>
    <Button
      variant="outline-default"
      onClick={() => {
        history.goBack()
        }}>
          Retour	
    </Button>
    <h3>CAtegories liste</h3>
  </div>
  )
}
export default AddGite;
