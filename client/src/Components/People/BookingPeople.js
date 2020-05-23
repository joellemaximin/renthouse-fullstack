import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import FormControl from 'react-bootstrap/FormControl';
import {
  Button 
}
from 'reactstrap';
import '../Bookings/booking.css';

const BokingPeople = (props) => {
    const [adult, setAdult] = useState(null)
    const [child, setChild] = useState(null)
    const [focusedInput, setFocusedInput] = useState('startDate')
  
  return (
    <div className="booking-form">
        <div className="after-form">
            <div>
                <Button className="show-me">
                    <div className="under-title">Voyageurs</div>
                    <span  className="under-under-title">Ajoutez des voyageurs</span>
                </Button>
                <div>
                    {/*testons avec un adult dabord*/}
                    <div className="category-adults">
                        <div className="category-adult-title">
                            <div>Adults</div>
                            <div>Plus de 14ans</div>
                        </div>
                        <div className="category-adult-actions">
                            <Button>-</Button>
                            <span>0</span>
                            <Button>+</Button>

                        </div>
                    </div>
                    
                    {/* <div className="category-enfants">
                        <div className="category-enfant-title">
                            <div>Enfants/Bébé</div>
                            <div>1 an à 14ans</div>
                        </div>
                        <div className="category-enfant-actions">
                            <Button>-</Button>
                            <span>0</span>
                            <Button>+</Button>

                        </div>
                    </div> */}
                </div>

            </div>
        </div>
    </div>
  );
}

export default BokingPeople;
