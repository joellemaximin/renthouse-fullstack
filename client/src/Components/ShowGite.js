import React, { useState , Suspense, useEffect} from 'react';
import './gite.css';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import {
  Col,
  Input,
  Form,
  FormGroup,
  Label }
from 'reactstrap';
// const Booking = React.lazy(() => import('./Bookings/Booking'));
// import MyErrorBoundary from './MyErrorBoundary';

const Showgite = (props) => {

  const [gites, setGite] = useState([]);
  const [stuff, setEquip] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);

	const fetchGite = async () => {
		setShowLoading(true)
		fetch('/nos-gites')
			.then(res => res.json())
			.then(data => {
				setShowLoading(false)
				setGite(data)			
			})
			.catch(err => {
				console.log(err)
			})
  }

  const fetchEquipement = async () => {
		setShowLoading(true)
		fetch('/equipements')
			.then(res => res.json())
			.then(data => {
				setShowLoading(false)
				setEquip(data)			
			})
			.catch(err => {
				console.log(err)
			})
	}


	
  useEffect(() => {
    fetchGite();
    fetchEquipement();

  }, [])

    return (
         <div>
    {/* <Photos/> */}
    {/* <MyErrorBoundary>

    <Suspense fallback={<div>Loading...</div>}> */}
      
    
      <section className="presentation">
        
        
        <div className="home-descrp">
          {gites.map((gite, key) => 
          <div key={key}>
            <p className="header-home"> Séjourner dans un lieu idéal pour 4 personnes avec une vue magnifique en face de la nature.</p>

            <h2>Description</h2>
          
            <p>{gite.smallDescription}</p>
          </div>
          
          )}
          
        </div>
      </section>

      <hr/>


      
      <section className="home-equipments">
        <p className="header-home"> Séjourner dans un lieu idéal pour 4 personnes avec une vue magnifique en face de la nature.</p>
        <h2>Equipements</h2>
        <div>
          {stuff.map((equi, key) => 
            <div key={key} className="liste-equip">
              <h5>{equi.name}</h5>
              <p>{equi.information}</p>

            </div>
          
          )}
        </div>
      </section>
      {/* </Suspense> 
    </MyErrorBoundary> */}

    {/* liste des commentaires */}
  </div>
  )
}
export default Showgite;
