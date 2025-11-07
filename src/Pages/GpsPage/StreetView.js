import React from "react";
import { GoogleMap, LoadScript, StreetViewPanorama } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "250px",
};


function StreetView({ lat, lng }) {
    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
    };
    return (
        <LoadScript googleMapsApiKey="AIzaSyBb1UE040G5Awd5V9UNPkk8rjEK1hDTYik">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
                <StreetViewPanorama
                    position={center}
                    visible={true}
                    options={{
                        pov: { heading: 100, pitch: 0 },
                        zoom: 1,
                    }}
                />
            </GoogleMap>
        </LoadScript>
    );
}

export default StreetView;
