import React, { useState, useEffect} from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'
import {
    Button 
  }
from 'reactstrap';
import '../Bookings/booking.css';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios';


const BookingCalendar = (props) => {
    const [checkIn, setcheckIn] = useState(null)
    const [checkOut, setcheckOut] = useState(null)
    const [focusedInput, setFocusedInput] = useState('startDate')
  
    // const searchDate = async () => {
    //     Axios.get('/bookings/searchdate')
    //     .then(res => res.json())
    //     .then(data => {
    //         setcheckOut(data)			
            
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
      
    // }

    // useEffect(() => {
    //     searchDate();    
    // }, [])

    console.log(checkOut, checkIn)

  return (
      
    <div className="booking-form">
        <div className="after-form">
            <div>
                <Button className="show-me">
                    <div className="under-title">Arrivée / Départ</div>
                </Button>
                <div className="category-dates">
                    <DateRangePicker
                        startDate={checkIn}
                        startDateId="your_unique_start_date_id"
                        endDate={checkOut}
                        endDateId="your_unique_end_date_id"
                        onDatesChange={({ startDate, endDate }) => {
                        setcheckIn(startDate)
                        setcheckOut(endDate)
                        }}
                        focusedInput={focusedInput}
                        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    />
                    <Button 
						// onClick={()=> {searchDate()}}
                    ></Button>
                </div>


            </div>
       </div>
    </div>
  );
}

export default BookingCalendar;
// setcheckIn(startDate.format("YYYY-MM-DD"))
// setcheckOut(endDate.format("YYYY-MM-DD"))
// }}