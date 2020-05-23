import React, { useState , useEffect} from 'react';
import axios from 'axios';
// import Photos from './Photos';
import { useParams, useHistory } from 'react-router-dom';


const GalleryPhotos = (props) => {
    const [photos, setPhotos] = useState([]);
	const [showLoading, setShowLoading] = useState(true);
	const [error, setError] = React.useState(null);
	const history = useHistory()

    const fetchPhotos = async () => {
		setShowLoading(true)
		fetch('/photos')
			.then(res => res.json())
			.then(data => {
				setShowLoading(false)
				setPhotos(data)			
			})
			.catch(err => {
				console.log(err)
			})
    }
    
    useEffect(() => {
        fetchPhotos();
    
      }, [])
    

return (
    <div>
        {photos.map((photo, key) => 
            <ul key={key} className="liste-home">
              <li>
                <img className="images" src={photo} alt="logo" />
              </li>
            </ul>
        )}

    </div>
    )
}
export default GalleryPhotos;
