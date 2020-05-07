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

const AfterBooking = (props) => {
	const [showLoading, setShowLoading] = useState(true);
    const history = useHistory()
   // message of booking is registred, or not

	


return (
  <div>
    <Button
      variant="outline-default"
      onClick={() => {
        history.goBack()
        }}>
          Retour	
    </Button>

    
  </div>
  )
}
export default AfterBooking;
