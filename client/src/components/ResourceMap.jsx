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

// User location marker (Red)
const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});



function ResourceMap() {
  const defaultPosition = [9.9252, 78.1198]; // Madurai

  const [position, setPosition] = useState(defaultPosition);
  const [places, setPlaces] = useState([]);
  
  const [useLocation, setUseLocation] = useState(true);
  

  const fetchNearbyResources = async (lat, lon) => {
    const query = `
[out:json][timeout:25];
(
  node["amenity"="hospital"](around:30000,${lat},${lon});
  way["amenity"="hospital"](around:30000,${lat},${lon});
  relation["amenity"="hospital"](around:30000,${lat},${lon});

  node["amenity"="clinic"](around:30000,${lat},${lon});
  way["amenity"="clinic"](around:30000,${lat},${lon});

  node["amenity"="doctors"](around:30000,${lat},${lon});

  node["healthcare"="psychiatrist"](around:30000,${lat},${lon});
  node["healthcare"="psychotherapist"](around:30000,${lat},${lon});
  node["healthcare"="counselling"](around:30000,${lat},${lon});
  node["healthcare"="mental_health"](around:30000,${lat},${lon});

  node["office"="psychologist"](around:30000,${lat},${lon});
);
out center;
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

      const excludedKeywords = [
        "eye",
        "vision",
        "optical",
        "dental",
        "dentist",
        "kidney",
        "renal",
        "urology",
        "dialysis",
        "pulmonology",
        "pulmonary",
        "lung",
        "cardiology",
        "cardiac",
        "heart",
        "orthopedic",
        "orthopaedic",
        "bone",
        "spine",
        "skin",
        "derma",
        "dermatology",
        "neurology",
        "neuro",
        "oncology",
        "cancer",
        "fertility",
        "ivf",
        "maternity",
        "gynaec",
        "gynecology",
        "children",
        "pediatric",
        "paediatric",
        "ent",
        "ear",
        "nose",
        "throat",
        "physiotherapy",
      ];

      const keywords = [
  "mental",
  "mind",
  "psychiatric",
  "psychiatry",
  "psychiatrist",
  "psychologist",
  "psychotherapy",
  "psychotherapist",
  "wellness",
  "counselling",
  "counseling",
  "behaviour",
  "behavior",
  "rehabilitation"
];

const filteredPlaces = data.elements
  .map((place) => {
    const tags = place.tags || {};
    const name = (tags.name || "").toLowerCase();

    let score = 0;

    // Highest priority
    if (
      tags.healthcare === "psychiatrist" ||
      tags.healthcare === "psychotherapist" ||
      tags.office === "psychologist"
    ) {
      score += 100;
    }

    // Name contains mental health keywords
    keywords.forEach((keyword) => {
      if (name.includes(keyword)) {
        score += 50;
      }
    });

    // General hospitals
    if (tags.amenity === "hospital") {
      score += 20;
    }

    // Clinics
    if (tags.amenity === "clinic") {
      score += 10;
    }

    return {
      ...place,
      score,
    };
  })
  .filter((place) => place.score > 0);

      filteredPlaces.sort((a, b) => {

  if (b.score !== a.score) {
    return b.score - a.score;
  }

  const latA = a.lat || a.center?.lat;
  const lonA = a.lon || a.center?.lon;

  const latB = b.lat || b.center?.lat;
  const lonB = b.lon || b.center?.lon;

  const dA = calculateDistance(position[0], position[1], latA, lonA);
  const dB = calculateDistance(position[0], position[1], latB, lonB);

  return dA - dB;
});

setPlaces(filteredPlaces);
    }catch (err) {

  console.log("Overpass API failed. Loading MongoDB resources...");

  try {

    const response = await fetch(
      `http://localhost:5000/api/resources?lat=${lat}&lon=${lon}`
    );

    const data = await response.json();

    const converted = data.map((hospital) => ({
      id: hospital._id,
      lat: hospital.latitude,
      lon: hospital.longitude,
      tags: {
        name: hospital.name,
        healthcare: hospital.type,
        "addr:city": hospital.city,
      },
    }));

    setPlaces(converted);

  } catch (dbErr) {

    console.log("MongoDB fallback failed:", dbErr);

    alert("Unable to load nearby mental health resources.");

  }

}
  };

  useEffect(() => {
    if (!useLocation) {
      setPosition(defaultPosition);
      fetchNearbyResources(defaultPosition[0], defaultPosition[1]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        setPosition([lat, lon]);

        fetchNearbyResources(lat, lon);
      },
      () => {
        alert(
          "Location access denied. Showing resources around Madurai."
        );

        setPosition(defaultPosition);
        fetchNearbyResources(defaultPosition[0], defaultPosition[1]);
      }
    );
  }, [useLocation]);
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (
    R *
    2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  ).toFixed(1);
};
  return (
    <div>

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-emerald-700">
          Nearby Mental Health Resources
        </h2>

        <button
          onClick={() => setUseLocation(!useLocation)}
          className={`px-4 py-2 rounded-lg text-white transition ${useLocation
              ? "bg-red-500 hover:bg-red-600"
              : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
          {useLocation ? "Turn Off Location" : "Use My Location"}
        </button>

      </div>

      <MapContainer
        center={position}
        zoom={13}
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

        {useLocation && (
          <Marker
            position={position}
            icon={userIcon}
          >
            <Popup>
              <strong>You are here</strong>
            </Popup>
          </Marker>
        )}

        {places.slice(0,15).map((place) => {
          const latitude = place.lat || place.center?.lat;
          const longitude = place.lon || place.center?.lon;

          if (!latitude || !longitude) return null;

          return (
            <Marker
              key={place.id}
              position={[latitude, longitude]}
            >
              <Popup>
                <strong>
                  {place.tags.name || "Healthcare Facility"}
                </strong>

                <br />

                {place.tags.healthcare ||
                  place.tags.amenity ||
                  place.tags.office ||
                  "Healthcare"}

                <br />

                {place.tags["addr:street"] || ""}

                {place.tags["addr:city"]
                  ? `, ${place.tags["addr:city"]}`
                  : ""}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div className="mt-8">

  <h2 className="text-2xl font-bold text-emerald-700 mb-5">
    Nearby Mental Health Resources
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {places.slice(0,5).map((place) => {

      const latitude = place.lat || place.center?.lat;
      const longitude = place.lon || place.center?.lon;

      if (!latitude || !longitude) return null;

      const distance = calculateDistance(
        position[0],
        position[1],
        latitude,
        longitude
      );

      return (

        <div
          key={place.id}
          className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
        >

          <h3 className="text-xl font-bold text-emerald-700">

            {place.tags.name || "Healthcare Facility"}

          </h3>

          <p className="mt-2">

            <strong>Type:</strong>{" "}

            {place.tags.healthcare ||
              place.tags.office ||
              place.tags.amenity ||
              "Healthcare"}

          </p>

          <p>

            <strong>Distance:</strong> {distance} km

          </p>

          <p className="text-gray-500 mt-2">

            {place.tags["addr:street"] || ""}

            {place.tags["addr:city"]
              ? `, ${place.tags["addr:city"]}`
              : ""}

          </p>

        </div>

      );

    })}

  </div>

</div>
    </div>
  );
}

export default ResourceMap;