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
import Booking from './Bookings/Booking';
// const Booking = React.lazy(() => import('./Bookings/Booking'));
// import MyErrorBoundary from './MyErrorBoundary';
import Comments from './Comments';

import { useParams, useHistory } from 'react-router-dom';
// import Photos from './Photos';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Door from './svg/door.svg'
import Space from './svg/space.svg'
import People from './svg/people.svg'
import NoDogs from './svg/nodogs.svg'
import Wifi from './svg/sifi.svg'
import Home from  './svg/home.svg'

const Gites = (props) => {

  const [gites, setGite] = useState([]);
  const [stuff, setEquip] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	const history = useHistory()

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

      <Booking/>
      
      <Jumbotron fluid>
        <h2>LOCATION TOURISTIQUE</h2>
        <small>
          Séjournez en Grande-Terre, flânez sur les plages de sable blanc à l’ombre des cocotiers vous offrant des sites de bronzage incomparable ou la possibilité de faire des balades en mer. Déguster les fruits de mer dans les villages de pêcheurs (Saint-François, Sainte-Anne, le Moule et Pointe-à-Pitre) et visiter les sites époustouflants comme la Pointe des Châteaux, le mémorial acte. Faites la traversée vers Marie-Galante, les Saintes ou la Désirade.
        </small>
        <small>
          Avec une location saisonnière en Guadeloupe à Morne-à-l’Eau, mélangez traditions et gastronomie lors de la Fête du crabe. Célébrez les cuisinières près du Marché aux épices de Pointe-à-Pitre. Imprégnez-vous des rythmes créoles le temps du festival de blues de Marie-Galante. Passez la fin d’année au chaud en célébrant le Noël Kakado, et préparez-vous à une fête encore plus colorée avec le carnaval qui envahit tout l’archipel en février.
        </small>
      </Jumbotron>


      <section className="presentation">
        <header>
          <div>
            <h2>Gite - Logement entier</h2>
            <p>ratings</p>
          </div>
        </header>
        <div>
        
          {gites.map((gite, key) => 
            <ul key={key} className="liste-home">
              <li>
                <img className="logoGite other" src={People} alt="logo" />
                4 Personnes
              </li>

              <li>
                <img className="logoGite" src={Door} alt="logo" />
                {gite.rooms} Chambres
              </li>

              <li>
                <img className="logoGite other" src={Space} alt="logo" />
                {gite.surface} m <sup>2</sup>
              </li>

              <li>
                <img className="logoGite reduce" src={Wifi} alt="logo" />
                {gite.wifi}
              </li>

              <li>
                <img className="logoGite other" src={Home} alt="logo" />
                Maison plein pied
              </li>
            </ul>
          )}
        </div>
        
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

      <button 
        className="colorButton-general frontpage"
        style={{ whiteSpace: "pre" }}
        variant="outline-primary"
        size="sm"
        onClick={() =>
          history.push('/contact-hote') } 
        >Contactez le hôte
      </button> 

      
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
export default Gites;
