// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup
// } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix marker icons
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIcon2x,
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
// });

// function ResourceMap() {

//   const mapRef = useRef(null);

//   useEffect(() => {

//     gsap.from(mapRef.current, {
//       opacity: 0,
//       y: 60,
//       duration: 1,
//       ease: "power3.out",
//     });

//   }, []);

//   const locations = [
//     {
//       name: "Government Hospital",
//       position: [13.0827, 80.2707],
//       type: "Hospital",
//     },
//     {
//       name: "Counselling Centre",
//       position: [13.0674, 80.2376],
//       type: "Counselling",
//     },
//     {
//       name: "Mental Wellness Clinic",
//       position: [13.0480, 80.2120],
//       type: "Clinic",
//     },
//   ];

//   return (
//     <div
//       ref={mapRef}
//       className="bg-white dark:bg-[#24372E] rounded-3xl shadow-xl p-6"
//     >

//       <h2 className="text-3xl font-bold text-center text-emerald-700 dark:text-green-300 mb-6">
//         Nearby Mental Health Resources
//       </h2>

//       <MapContainer
//         center={[13.0827, 80.2707]}
//         zoom={12}
//         className="h-[500px] rounded-2xl"
//       >

//         <TileLayer
//           attribution='&copy; OpenStreetMap contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {locations.map((location, index) => (

//           <Marker
//             key={index}
//             position={location.position}
//           >

//             <Popup>

//               <strong>{location.name}</strong>

//               <br />

//               {location.type}

//             </Popup>

//           </Marker>

//         ))}

//       </MapContainer>

//     </div>
//   );
// }

// export default ResourceMap;
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ResourceMap() {
  const [position, setPosition] = useState([9.9252, 78.1198]); // Madurai default
  const [places, setPlaces] = useState([]);

  const fetchNearbyResources = async (lat, lon) => {
    const query = `
  [out:json];
  (
    node["amenity"="hospital"](around:5000,${lat},${lon});
    node["healthcare"="psychotherapist"](around:5000,${lat},${lon});
    node["healthcare"="counselling"](around:5000,${lat},${lon});
    node["amenity"="clinic"](around:5000,${lat},${lon});
  );
  out;
  `;

    try {
      const response = await fetch(
        "https://overpass-api.de/api/interpreter",
        {
          method: "POST",
          body: query,
        }
      );

      const data = await response.json();

      setPlaces(data.elements);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setPosition([lat, lon]);

        fetchNearbyResources(lat, lon);
      },
      () => {
        console.log("Location permission denied.");
      }
    );
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          You are here
        </Popup>
      </Marker>
      {places.map((place) => {
  const latitude = place.lat || place.center?.lat;
  const longitude = place.lon || place.center?.lon;

  if (!latitude || !longitude) return null;

  return (
    <Marker
      key={place.id}
      position={[latitude, longitude]}
    >
      <Popup>
        <strong>{place.tags.name || "Healthcare Facility"}</strong>
        <br />
        {place.tags.amenity || place.tags.healthcare || "Medical Facility"}
      </Popup>
    </Marker>
  );
})}

    </MapContainer>
  );
}

export default ResourceMap;