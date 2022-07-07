import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "./osm-providers";

import addresses from "./addresses.json";

const markerIcon = new L.Icon({
    iconUrl: require("../resources/images/map.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

const LMap = () => {
    const [center, setCenter] = useState({ lat: 48.862725, lng: 2.287592 });
    const ZOOM_LEVEL = 10;
    const mapRef = useRef();

    return (
        <>

            <div className="row">
                <div className="col text-center">
                    <h2>Overview of our shops </h2>
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />

                            {addresses.map((address, idx) => (
                                <Marker
                                    position={[address.lat, address.lng]}
                                    icon={markerIcon}
                                    key={idx}
                                >
                                    <Popup>
                                        <b>
                                            {address.address}, {address.city}
                                        </b>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LMap;