import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';
import TokenMap from './token-google'
import './MapMe.css';
import Restaurant from  './svg/restaurant.svg'

const mapStyles = {
  width: '65%',
  height: '50%',
  alignContent: 'center'
};


export class Maps extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {},          //Shows the infoWindow to the selected place upon a marker
    
  };
  

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <div className="card-map">
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{
            lat: 16.326,
            lng: -61.457
          }}
          
        >
            <Marker
              onClick={this.onMarkerClick}
              name={'La terrasse'}
              position={{lat: 16.34252, lng: -61.5112}}
            />

            <Marker
              onClick={this.onMarkerClick}
              name={'Felo Grill'}
              position={{lat: 16.330978, lng:-61.460803}} 
            />
          

            <Marker
              onClick={this.onMarkerClick}
              name={'CocoSec & Amande Location'}
            />

    
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <p>{this.state.selectedPlace.name}</p>

            </div>
          </InfoWindow>


           
          </Map> 

      </div>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: TokenMap.ACCES_MAP
})(Maps);