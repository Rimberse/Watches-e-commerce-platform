import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import osm from "../services/osm-providers";

const markerIcon = new L.Icon({
    iconUrl: require("../resources/images/map.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46],   // [left/right, top/bottom]
    popupAnchor: [0, -46],  // [left/right, top/bottom]
});

const LMap = () => {
    const [center, setCenter] = useState({ lat: 48.862725, lng: 2.287592 });
    const ZOOM_LEVEL = 10;
    const mapRef = useRef();
    const addresses = [
        {
            "address": "3 Av. de la République",
            "city": "Villejuif",
            "lat": "48.862725",
            "lng": "2.287592"
        },
        {
            "address": "Baku Old City, Neftchilar Ave",
            "city": "Baku",
            "lat": "40.3833",
            "lng": "49.8666"
        },
        {
            "address": "Eha 26 Lääne-Virumaa",
            "city": "Järsi",
            "lat": "59.43333",
            "lng": "24.7166"
        },
        {
            "address": "8 rue de Beaupaire",
            "city": "Paris",
            "lat": "48.86666",
            "lng": "2.3333"
        },
        {
            "address": "13 rue Sainte-Catherine",
            "city": "Bordeaux",
            "lat": "44.837789",
            "lng": "-0.57918"
        },
        {
            "address": "Misbah road",
            "city": "New Delhi",
            "lat": "28.644800",
            "lng": "77.216721"
        }
    ];

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <h2>Overview of our shops </h2>
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} innerRef={mapRef}>
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