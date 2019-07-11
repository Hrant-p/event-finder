import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { googleAPI } from '../../../API/keys';

class GoogleMap extends Component {
  
  
    render() {
        const style = {
            width: '100%',
            height: '600px',
            };
        // let position = new google.maps.LatLng(41.3060796, -72.9304171);

        return (
          <div>
            Hello GoogleMap
            <Map google={this.props.google} style={style}>
              <Marker
                // name={"Your position"}
                position={{
                  lat: 41.3061335,
                  lng: -72.9325132
                }}
              />
            </Map>
          </div>
        );
  }
};

export default GoogleApiWrapper({
  apiKey: googleAPI.MAPS_API_KEY
})(GoogleMap);
