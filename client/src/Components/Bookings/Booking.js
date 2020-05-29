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
import '../booking.css'
import { useParams, useHistory } from 'react-router-dom';
import BookingCalendar from "../Calendar/BookingCalendar";
import BookingPeople from "../People/BookingPeople";


const Booking = (props) => {
	const [showLoading, setShowLoading] = useState(true);
    const [inputs, setInputs] = useState(
        {name: '', email: '', checkIn: '', checkOut: '', bookedDay: '', giteName: ''}
    );
  const history = useHistory()


  const handleInputChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value});
  };

  const makeBoking = async (e) => {
    e.preventDefault()
    axios.post('/api/booking/', inputs,
      {
      validateStatus: function (status) {
      return status < 600; // Reject only if the status code is greater than or equal to 500
      }}
    )
    .catch(function (error) {
      console.log(error);
    })  
    .then(function (response) {
      props.history.push('/')
      // console.log(response)
    })
  }

	


return (
  <div className="booking-holiday">
    <div className="box-model">
      <h2 className="title-booking">Réservez votre hébergment dans la nature</h2>

      <Form onSubmit={makeBoking} >
        
        <BookingCalendar/>


        <BookingPeople/>
        

  
        <div className="submit_newbook">
          <Button
          className="waves-effect waves-light btn"
          type="submit"
          >
          Réserver
          </Button>
        </div>
  
      </Form>
    </div>
  </div>
  )
}
export default Booking;
