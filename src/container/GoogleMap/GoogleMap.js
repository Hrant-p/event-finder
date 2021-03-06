import React, { Component } from 'react';
import {
  Map, Marker, GoogleApiWrapper, InfoWindow
} from 'google-maps-react';
import { connect } from 'react-redux';
import { googleAPI } from '../../API/keys';
import { findedEventsSelector, isLoadingEventsSelector } from '../../store/selectors/eventSelector';
import './GoogleMap.scss';

class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

    onMarkerClick = (props, marker, e) => this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    handleMarkers = () => {
      const { findedEvents } = this.props;

      return findedEvents.map(item => (
        <Marker
          key={item.get('id')}
          name={item.get('name')}
          title={item.get('name')}
          onClick={this.onMarkerClick}
          position={{
            lat: item.getIn(['location', 'lat']),
            lng: item.getIn(['location', 'lng'])
          }}
        />
      ));
    };

    render() {
      const { isLoading, findedEvents } = this.props;

      return (
        <div className="map-component">
          <Map
            className="map-field"
            google={this.props.google}
            style={{
              position: 'unset',
              height: '500px',
              margin: '0 auto'
            }}
            center={{
              lat: findedEvents.getIn([
                0, 'location', 'lat'
              ]) || 35.5496939,
              lng: findedEvents.getIn([
                0, 'location', 'lng'
              ]) || -120.706004
            }}
          >
            {this.handleMarkers()}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          </Map>
          {isLoading && <div className="lds-hourglass" />}
        </div>
      );
    }
}

const mapStateToProps = state => ({
  isLoading: isLoadingEventsSelector(state),
  findedEvents: findedEventsSelector(state)
});

export default connect(
  mapStateToProps
)(
  GoogleApiWrapper({ apiKey: googleAPI.MAPS_API_KEY })(GoogleMap)
);
