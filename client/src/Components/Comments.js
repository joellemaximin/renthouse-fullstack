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

const Comments = (props) => {
  const [activity, setActivity] = useState([]);
	const [error, setError] = React.useState(null);
	const history = useHistory()

  
  

return (
  <div>
    <h3>Tourisme en guadeloupe a proximité :</h3>
    <section className="activites">
      <h2>différentes activités a proximité</h2>
   			
        
    </section>
  </div>
  )
}
export default Comments;
