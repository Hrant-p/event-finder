import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { googleAPI } from '../../../API/keys';
import { connect } from 'react-redux';
import { findedEventsSelector, isLoadingEventsSelector } from '../../../store/selectors/eventSelector';

class GoogleMap extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        };
    }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

  
    render() {
        const style = { width: '100%', height: '600px' };
        const { isLoading } = this.props;
        const events = this.props.findedEvents.toJS();

        let center = events.length > 0 ? events[0].location : { lat: "40.1996724", lng: "44.565436" };
        let eventMarkers = null;

        if (events.length > 0) {
            eventMarkers = events.map(item => {
                return <Marker
                    key={item.id}
                    name={item.name}
                    title={item.name}
                    onClick={this.onMarkerClick}
                    position={{
                        lat: item.location.lat,
                        lng: item.location.lng
                    }} />
            })
        }        

        return (
            <React.Fragment>
                <Map 
                    google={this.props.google}
                    style={style}
                    center={center}
                    >
                    {eventMarkers}
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h3>{this.state.selectedPlace.name}</h3>
                        </div>
                    </InfoWindow>
                </Map>
                {isLoading && <div className="lds-hourglass" />}
            </React.Fragment>
        );
    }
};

const mapStateToProps = state => ({
  isLoading: isLoadingEventsSelector(state),
  findedEvents: findedEventsSelector(state)
});

export default connect(
    mapStateToProps
)(
    GoogleApiWrapper({ apiKey: googleAPI.MAPS_API_KEY })(GoogleMap))
