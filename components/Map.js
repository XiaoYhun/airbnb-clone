import React, { useState } from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from "react-map-gl";
import { getCenter } from "geolib";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
function Map({
  searchResults,
  hoverLocationId,
  selectedLocationId,
  onSelectLocation,
  onCloseSelect,
}) {
  const coordinates = searchResults?.map((item) => {
    return { latitude: item.lat, longitude: item.long };
  });
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: center.latitude || 37.7577,
    longitude: center.longitude || -122.4376,
    zoom: 13,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/xiaoyhun/cku52vqn727fp18timn0cjbvu"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      scrollZoom={{ speed: 12, smooth: true }}
    >
      {searchResults?.map((item) => (
        <div key={item.long}>
          <Marker
            longitude={item.long}
            latitude={item.lat}
            offsetLeft={-27}
            offsetTop={-20}
            className={"hover:z-10 " + (item.id === hoverLocationId ? "z-10" : "z-1")}
          >
            <div
              key={item.long}
              onClick={() => onSelectLocation(item.id)}
              className={
                "cursor-pointer text-md font-bold rounded-full px-2 shadow-md hover:scale-[1.07] transition duration-100 hover:shadow-lg ease-out " +
                (item.id === hoverLocationId || item.id === selectedLocationId
                  ? "bg-black text-white scale-[1.07] shadow-lg z-100"
                  : "bg-white")
              }
            >
              {item.price}
            </div>
          </Marker>
          {selectedLocationId === item.id ? (
            <Popup
              onClose={onCloseSelect}
              closeOnClick={true}
              latitude={item.lat}
              longitude={item.long}
              offsetTop={-30}
              offsetLeft={-5}
              className="z-20 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
              closeButton={false}
              tipSize={0}
            >
              <div className=" w-[250px] flex flex-col">
                <div className="h-[200px] relative -mt-4 -mx-4">
                  <Image src={item.img} layout="fill" objectFit="cover" />
                </div>
                <div className="text-lg pt-2 px-2">
                  <p className="flex items-center text-md">
                    <StarIcon className="h-5 text-red-400" />
                    {item.star}
                  </p>
                  <p>{item.title}</p>
                  <p className="font-bold">
                    {item.price} <small className="font-normal">/night</small>
                  </p>
                </div>
              </div>
            </Popup>
          ) : null}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
