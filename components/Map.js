import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults?.map((item) => {
    return { latitude: item.lat, longitude: item.long };
  });
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude || 37.7577,
    longitude: center.longitude || -122.4376,
    zoom: 11,
  });
  console.log(selectedLocation);
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/xiaoyhun/cku2mx9d63w7o17p4cbbckii0"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults?.map((item) => (
        <div key={item.long}>
          <Marker longitude={item.long} latitude={item.lat} offsetLeft={-15} offsetTop={-20}>
            <p
              role="img"
              onClick={() => setSelectedLocation(item)}
              className="cursor-pointer text-2xl"
              aria-label="push-bin"
            >
              📍
            </p>
          </Marker>
          {selectedLocation.long === item.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={item.lat}
              longitude={item.long}
              offsetTop={-20}
              offsetLeft={-5}
            >
              {item.title}
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
