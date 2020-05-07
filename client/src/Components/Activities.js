import React, { useState , useEffect} from 'react';
import axios from 'axios';
import FormControl from 'react-bootstrap/FormControl';
import {
  Table } from 'reactstrap';
import classnames from 'classnames';
import Maps from './Maps';
import { useParams, useHistory } from 'react-router-dom';
import './activity.css';

const Activities = (props) => {
  const [activity, setActivity] = useState([]);
	const [error, setError] = React.useState(null);
	const history = useHistory()
  const [categories, setCate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }



  const fetchActivity = async () => {
    fetch('/activities')
			.then(res => res.json())
			.then(data => {
        setIsLoading(false)
        setActivity(data)			
        console.log(data)
			})
			.catch(err => {
				console.log(err)
			})
  }

  const fetchCategory = async () => {
		fetch('/categories')
			.then(res => res.json())
			.then(data => {
				setCate(data)			
			})
			.catch(err => {
				console.log(err)
			})
  }

  function renderActivities(activity) {
    return null;
  }

  useEffect(() => {
    fetchCategory();
    fetchActivity();
  }, [])

return (
  <div>
    <h3 className='title'>Tourisme en guadeloupe a proximité :</h3>

    <section>

      <Table className="activity-box" bordered hover >
        <thead>
          <tr>
            <th>Activitées</th>
            <th>Société</th>
            <th>Lieu</th>
            <th>Lien</th>
          </tr>
        </thead>
        <tbody>
          {
          !isLoading && 
          
					activity.map((act, key) => 
						<tr key={key} className="">
              <td>
                <p>{act.title}</p> 
              </td>
							<td>
                <p>{act.title_activity}</p> 
              </td>		
              <td>
                <p>{act.location}</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <small>* 5% OFF, Gagnez des réductions de nos activités ci-dessous en passant un moment chez nous</small>
    </section>

    <section className="map-box">
      <Maps/>
    </section>

  </div>
  )
}
export default Activities;
