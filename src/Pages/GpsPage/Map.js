// import React from "react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const DynamicMap = ({ lat, lng }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBb1UE040G5Awd5V9UNPkk8rjEK1hDTYik", // 🔑 Replace with your real key
//   });

//   const center = {
//     lat: parseFloat(lat),
//     lng: parseFloat(lng),
//   };

//   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={14}
//     >
//       <Marker position={center} />
//     </GoogleMap>
//   );
// };

// export default DynamicMap;

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const DynamicMap = ({ lat, lng }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBb1UE040G5Awd5V9UNPkk8rjEK1hDTYik", // Replace with your key
    });

    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
    };

    //   const mapOptions = {
    //     zoomControl: true,
    //     mapTypeControl: true,
    //     streetViewControl: true,
    //     fullscreenControl: true,
    //     rotateControl: true,
    //     scaleControl: true,
    //   };
    const mapOptions = {
        zoomControl: true,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        rotateControl: true,
        scaleControl: true,
        controlSize: 28, // icon size
       
    };
    if (!isLoaded) return <div>Loading Map...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={mapOptions}
        >
            <Marker position={center} />
        </GoogleMap>
    );
};

export default DynamicMap;

