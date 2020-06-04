import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYmdyZWVudyIsImEiOiJja2F5bHRjYWswaWFhMnh0MDY3eTFqOHV1In0.ilXA9X2hebhSbUCzH9yj-A';

function Map(props) {
    // Handles when the map is clicked
    const onClick = e => {
        props.onMapClick(e.lngLat)
    }

    // Default map settings
    let [viewport, setViewport] = useState({
        width: 800,
        height: 800,
        latitude: -41.7618757,
        longitude: 172.4553581,
        zoom: 5
    });
    
    // Create marker if a city is selected
    let marker;
    if(props.responseData && props.responseData.cod === 200) {
        let data = {
            latitude: parseFloat(props.responseData.coord.lat),
            longitude: parseFloat(props.responseData.coord.lon),
            offsetLeft: -10,
            offsetTop: -20
        }

        marker = (
            <Marker {...data}>
                <img src="/pin.png" alt="map pin" className="map-icon" />
            </Marker>
        );

        viewport = {
            ...viewport,
            latitude: data.latitude,
            longitude: data.longitude,
            zoom: 11.5
        };
    }

    // Render the map and marker if available
    return (
        <ReactMapGL
            { ...viewport }
            onViewportChange = { nextViewport => setViewport(nextViewport) }
            mapboxApiAccessToken = { MAPBOX_TOKEN }
            mapStyle = 'mapbox://styles/mapbox/streets-v11'
            onClick = {onClick}
        >
            { marker || '' }
        </ReactMapGL>
    )
}
  
export default Map