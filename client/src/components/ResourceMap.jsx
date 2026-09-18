import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { useEffect, useState } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

// --------------------------------------------------
// LEAFLET MARKER FIX
// --------------------------------------------------

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// --------------------------------------------------
// MAP VIEW UPDATER
// --------------------------------------------------

function MapUpdater({ position, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, zoom);
    }
  }, [position, zoom, map]);

  return null;
}

// --------------------------------------------------
// MAP SIZE FIXER
// --------------------------------------------------

function MapSizeFixer() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

// --------------------------------------------------
// RESOURCE MAP
// --------------------------------------------------

function ResourceMap() {
  // ------------------------------------------------
  // TAMIL NADU DISTRICTS
  // ------------------------------------------------

  const districts = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvannamalai",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];

  // ------------------------------------------------
  // INITIAL MAP POSITION
  // ------------------------------------------------

  const tamilNaduCenter = [10.8505, 78.7047];

  const [position, setPosition] =
    useState(tamilNaduCenter);

  // ------------------------------------------------
  // RESOURCE STATE
  // ------------------------------------------------

  const [places, setPlaces] = useState([]);

  const [selectedDistrict, setSelectedDistrict] =
    useState("");

  const [showAllResources, setShowAllResources] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  // ------------------------------------------------
  // NORMALIZE DISTRICT
  // ------------------------------------------------

  const normalizeDistrict = (district) => {
    let value = String(district || "")
      .toLowerCase()
      .trim();

    // Remove "District" if backend contains it.
    value = value.replace(
      /\s+district$/i,
      ""
    );

    // Handle known spelling variation.
    if (value === "pudukottai") {
      value = "pudukkottai";
    }

    return value;
  };

  // ------------------------------------------------
  // NORMALIZE RESOURCE
  // ------------------------------------------------

  const normalizeResource = (resource) => {
    const latitude = Number(
      resource.latitude ??
      resource.lat ??
      resource.center?.lat
    );

    const longitude = Number(
      resource.longitude ??
      resource.lon ??
      resource.center?.lon
    );

    // ----------------------------------------------
    // NEVER ALLOW INVALID COORDINATES
    // ----------------------------------------------

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      console.warn(
        "Resource rejected because coordinates are invalid:",
        resource
      );

      return null;
    }

    // ----------------------------------------------
    // BASIC LATITUDE/LONGITUDE RANGE CHECK
    // ----------------------------------------------

    if (
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      console.warn(
        "Resource rejected because coordinates are outside valid geographic range:",
        resource
      );

      return null;
    }

    // ----------------------------------------------
    // RETURN CLEAN RESOURCE
    // ----------------------------------------------

    return {
      id:
        resource._id ||
        resource.id ||
        `${latitude}-${longitude}-${resource.name || "resource"}`,

      lat: latitude,

      lon: longitude,

      name:
        resource.name ||
        resource.tags?.name ||
        "Mental Health Resource",

      resourceType:
        resource.type ||
        resource.resourceType ||
        resource.healthcare ||
        "Mental Health Resource",

      address:
        resource.address || "",

      city:
        resource.city ||
        resource.tags?.["addr:city"] ||
        "",

      district:
        resource.district ||
        resource.tags?.["addr:district"] ||
        "",

      state:
        resource.state ||
        resource.tags?.state ||
        "",

      country:
        resource.country || "India",

      phone:
        resource.phone || "",

      verified:
        resource.verified ?? false,

      verificationSource:
        resource.verificationSource || "",

      verificationNote:
        resource.verificationNote || "",
    };
  };

  // ------------------------------------------------
  // FETCH ALL VERIFIED TAMIL NADU RESOURCES
  // ------------------------------------------------

  const fetchTamilNaduResources = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      console.log(
        "Loading verified Tamil Nadu mental-health resources..."
      );

      // IMPORTANT:
      //
      // No browser location is requested.
      //
      // This endpoint returns the verified Tamil Nadu
      // resources stored in MongoDB.
      //
      // Coordinates come ONLY from MongoDB/backend.
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/resources/state`
      );

      if (!response.ok) {
        throw new Error(
          `Tamil Nadu resource API returned ${response.status}`
        );
      }

      const data = await response.json();

      console.log(
        "Resources returned from backend:",
        data
      );

      // --------------------------------------------
      // MAKE SURE RESPONSE IS AN ARRAY
      // --------------------------------------------

      if (!Array.isArray(data)) {
        throw new Error(
          "Tamil Nadu resource API did not return an array."
        );
      }

      // --------------------------------------------
      // NORMALIZE
      // --------------------------------------------

      const converted = data
        .map(normalizeResource)
        .filter(Boolean);

      // --------------------------------------------
      // TAMIL NADU ONLY
      // --------------------------------------------

      const tamilNaduResources =
        converted.filter((resource) => {
          return (
            String(resource.state || "")
              .toLowerCase()
              .trim() === "tamil nadu"
          );
        });

      // --------------------------------------------
      // VERIFIED ONLY
      // --------------------------------------------

      const verifiedResources =
        tamilNaduResources.filter(
          (resource) =>
            resource.verified === true
        );

      // --------------------------------------------
      // REMOVE DUPLICATES
      // --------------------------------------------

      const uniqueResources = Array.from(
        new Map(
          verifiedResources.map((resource) => [
            resource.id,
            resource,
          ])
        ).values()
      );

      // --------------------------------------------
      // SORT
      // --------------------------------------------

      uniqueResources.sort((a, b) => {
        const districtCompare =
          normalizeDistrict(
            a.district
          ).localeCompare(
            normalizeDistrict(
              b.district
            )
          );

        if (districtCompare !== 0) {
          return districtCompare;
        }

        return (
          a.name || ""
        ).localeCompare(
          b.name || ""
        );
      });

      console.log(
        "Verified Tamil Nadu resources:",
        uniqueResources
      );

      console.log(
        "Total verified Tamil Nadu resources:",
        uniqueResources.length
      );

      setPlaces(uniqueResources);

      if (uniqueResources.length === 0) {
        setErrorMessage(
          "No verified Tamil Nadu mental-health resources are currently available."
        );
      }
    } catch (error) {
      console.error(
        "Tamil Nadu resources request failed:",
        error
      );

      setPlaces([]);

      setErrorMessage(
        "Unable to load Tamil Nadu mental-health resources."
      );
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // LOAD RESOURCES ONCE
  // ------------------------------------------------

  useEffect(() => {
    fetchTamilNaduResources();

    // No browser geolocation is used.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ------------------------------------------------
  // DISTRICT SELECTION
  // ------------------------------------------------

  const handleDistrictClick = (district) => {
    console.log(
      "Selected district:",
      district
    );

    setSelectedDistrict(district);

    // Collapse cards to first 3.
    setShowAllResources(false);

    // ----------------------------------------------
    // FIND RESOURCES FROM THE SAME PLACES ARRAY
    // ----------------------------------------------

    const districtResources =
      places.filter((place) => {
        return (
          normalizeDistrict(
            place.district
          ) ===
          normalizeDistrict(
            district
          )
        );
      });

    console.log(
      `Resources in ${district}:`,
      districtResources
    );

    // ----------------------------------------------
    // MOVE MAP
    // ----------------------------------------------

    if (districtResources.length > 0) {
      setPosition([
        districtResources[0].lat,
        districtResources[0].lon,
      ]);
    }
  };

  // ------------------------------------------------
  // RESET TO ALL TAMIL NADU
  // ------------------------------------------------

  const handleAllTamilNadu = () => {
    console.log(
      "Showing all Tamil Nadu resources"
    );

    setSelectedDistrict("");

    setShowAllResources(false);

    setPosition(
      tamilNaduCenter
    );

    // No need to fetch again.
    //
    // We already have all resources in `places`.
  };

  // ------------------------------------------------
  // FILTER RESOURCES FOR SELECTED DISTRICT
  // ------------------------------------------------

  const displayedPlaces = selectedDistrict
    ? places.filter((place) => {
      return (
        normalizeDistrict(
          place.district
        ) ===
        normalizeDistrict(
          selectedDistrict
        )
      );
    })
    : places;

  // ------------------------------------------------
  // SHOW 3 CARDS INITIALLY
  // ------------------------------------------------

  const visiblePlaces =
    showAllResources
      ? displayedPlaces
      : displayedPlaces.slice(0, 3);

  // ------------------------------------------------
  // MAP ZOOM
  // ------------------------------------------------

  const mapZoom =
    selectedDistrict ? 12 : 7;

  // ------------------------------------------------
  // SHOULD SHOW SEE MORE?
  // ------------------------------------------------

  const shouldShowSeeMore =
    displayedPlaces.length > 3;

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <div>

      {/* ------------------------------------------
          HEADER
      ------------------------------------------ */}

      <div className="mb-5">

        <h2 className="text-2xl font-bold text-emerald-700">
          Tamil Nadu Mental Health Resources
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Select a district to view available
          verified mental-health resources in
          that district.
        </p>

      </div>


      {/* ------------------------------------------
          LOADING
      ------------------------------------------ */}

      {loading && (
        <div className="mb-4 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
          Loading verified Tamil Nadu mental-health
          resources...
        </div>
      )}


      {/* ------------------------------------------
          ERROR
      ------------------------------------------ */}

      {errorMessage && !loading && (
        <div className="mb-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-600">
          {errorMessage}
        </div>
      )}


      {/* ------------------------------------------
          DISTRICT SELECT
      ------------------------------------------ */}

      <div className="mb-5">

        <label
          htmlFor="district"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Select Tamil Nadu District
        </label>

        <select
          id="district"
          value={selectedDistrict}
          onChange={(e) => {

            const district =
              e.target.value;

            if (!district) {
              handleAllTamilNadu();
              return;
            }

            handleDistrictClick(
              district
            );
          }}
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >

          <option value="">
            All Tamil Nadu
          </option>

          {districts.map(
            (district) => (
              <option
                key={district}
                value={district}
              >
                {district}
              </option>
            )
          )}

        </select>

      </div>


      {/* ------------------------------------------
          DISTRICT BUTTONS
      ------------------------------------------ */}

      <div className="flex flex-wrap gap-2 mb-6">

        <button
          onClick={
            handleAllTamilNadu
          }
          className={`px-3 py-2 rounded-lg text-sm transition border ${selectedDistrict === ""
              ? "bg-emerald-600 text-white border-emerald-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
            }`}
        >
          All Tamil Nadu
        </button>

        {districts.map(
          (district) => {

            // IMPORTANT:
            //
            // Count is calculated from exactly
            // the same `places` array used by
            // the map and cards.
            //
            // Therefore Pudukottai/Pudukkottai
            // spelling differences cannot cause
            // the count to become 0.

            const count =
              places.filter(
                (place) =>
                  normalizeDistrict(
                    place.district
                  ) ===
                  normalizeDistrict(
                    district
                  )
              ).length;

            return (
              <button
                key={district}
                onClick={() =>
                  handleDistrictClick(
                    district
                  )
                }
                className={`px-3 py-2 rounded-lg text-sm transition border ${selectedDistrict ===
                    district
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                  }`}
              >

                {district}

                <span className="ml-1 text-xs opacity-70">
                  ({count})
                </span>

              </button>
            );
          }
        )}

      </div>


      {/* ------------------------------------------
          MAP
      ------------------------------------------ */}

      <MapContainer
        center={position}
        zoom={mapZoom}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "20px",
        }}
      >

        <MapSizeFixer />

        <MapUpdater
          position={position}
          zoom={mapZoom}
        />

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* ----------------------------------------
            RESOURCE MARKERS
        ---------------------------------------- */}

        {displayedPlaces.map(
          (place) => {

            const latitude =
              Number(place.lat);

            const longitude =
              Number(place.lon);

            // --------------------------------------
            // FINAL COORDINATE SAFETY CHECK
            // --------------------------------------

            if (
              !Number.isFinite(
                latitude
              ) ||
              !Number.isFinite(
                longitude
              )
            ) {
              return null;
            }

            return (
              <Marker
                key={place.id}
                position={[
                  latitude,
                  longitude,
                ]}
              >

                <Popup>

                  <div className="min-w-[220px]">

                    <strong className="text-emerald-700">
                      {place.name}
                    </strong>

                    <br />

                    <span>
                      {place.resourceType}
                    </span>


                    {/* ADDRESS */}

                    {place.address && (
                      <>
                        <br />
                        <span>
                          {place.address}
                        </span>
                      </>
                    )}


                    {/* CITY */}

                    {place.city && (
                      <>
                        <br />
                        <span>
                          {place.city}
                        </span>
                      </>
                    )}


                    {/* DISTRICT */}

                    {place.district &&
                      normalizeDistrict(
                        place.district
                      ) !==
                      normalizeDistrict(
                        place.city
                      ) && (
                        <>
                          <br />
                          <span>
                            {place.district}
                            {" District"}
                          </span>
                        </>
                      )}


                    {/* PHONE */}

                    {place.phone && (
                      <>
                        <br />
                        <span>
                          {place.phone}
                        </span>
                      </>
                    )}


                    {/* COORDINATES */}

                    <br />
                    <br />

                    <span className="text-xs text-gray-500">
                      Coordinates:
                      <br />
                      {latitude},{" "}
                      {longitude}
                    </span>


                    {/* VERIFICATION */}

                    {place.verified && (
                      <>
                        <br />
                        <br />

                        <span className="text-xs text-emerald-600 font-semibold">
                          ✓ Verified resource
                        </span>
                      </>
                    )}

                  </div>

                </Popup>

              </Marker>
            );
          }
        )}

      </MapContainer>


      {/* ------------------------------------------
          RESOURCE LIST
      ------------------------------------------ */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold text-emerald-700 mb-2">

          {selectedDistrict
            ? `${selectedDistrict} Mental Health Resources`
            : "Tamil Nadu Mental Health Resources"}

        </h2>


        <p className="text-gray-500 mb-5">

          {selectedDistrict
            ? `Verified mental-health resources recorded in ${selectedDistrict} district.`
            : "Verified mental-health resources recorded across Tamil Nadu."}

        </p>


        {/* ----------------------------------------
            RESOURCE COUNT
        ---------------------------------------- */}

        <p className="text-sm text-gray-500 mb-5">

          {displayedPlaces.length} resource
          {displayedPlaces.length !== 1
            ? "s"
            : ""}{" "}
          found.

        </p>


        {/* ----------------------------------------
            RESOURCE CARDS
        ---------------------------------------- */}

        {visiblePlaces.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-5">

            {visiblePlaces.map(
              (place) => (

                <div
                  key={place.id}
                  className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
                >

                  <h3 className="text-xl font-bold text-emerald-700">
                    {place.name}
                  </h3>


                  <p className="mt-3">

                    <strong>
                      Type:
                    </strong>{" "}

                    {place.resourceType}

                  </p>


                  {/* ADDRESS */}

                  {place.address && (
                    <p className="text-gray-500 mt-2">
                      {place.address}
                    </p>
                  )}


                  {/* CITY */}

                  {place.city && (
                    <p className="text-gray-500">
                      {place.city}
                    </p>
                  )}


                  {/* DISTRICT
                      Only display if it is
                      not already represented
                      by the city/address.
                  */}

                  {place.district &&
                    normalizeDistrict(
                      place.district
                    ) !==
                    normalizeDistrict(
                      place.city
                    ) && (
                      <p className="text-gray-500">
                        {place.district}
                      </p>
                    )}


                  {/* PHONE */}

                  {place.phone && (
                    <p className="mt-2">

                      <strong>
                        Phone:
                      </strong>{" "}

                      {place.phone}

                    </p>
                  )}


                  {/* COORDINATES */}

                  <p className="text-xs text-gray-400 mt-4">

                    Coordinates:
                    <br />

                    {place.lat},{" "}
                    {place.lon}

                  </p>


                  {/* VERIFIED */}

                  {place.verified && (
                    <p className="text-xs text-emerald-600 font-semibold mt-2">
                      ✓ Verified resource
                    </p>
                  )}

                </div>

              )
            )}

          </div>

        ) : (

          !loading && (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
              No verified mental-health resources are
              currently recorded for this district.
            </div>
          )

        )}


        {/* ----------------------------------------
            SEE MORE / SHOW LESS
        ---------------------------------------- */}

        {shouldShowSeeMore && (

          <div className="flex justify-center mt-6">

            <button
              onClick={() =>
                setShowAllResources(
                  !showAllResources
                )
              }
              className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >

              {showAllResources
                ? "Show Less"
                : `See More Resources (${displayedPlaces.length - 3} more)`}

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ResourceMap;