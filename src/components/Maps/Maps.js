import React, { useState } from "react";
import Map from "./Map";

const Maps = () => {
    const [bound, setBound] = useState({});

    return (
        <Map
            zoom={10}
            center={{ lat: 23.8103, lng: 90.4125 }}
            events={{ onBoundsChangerd: arg => setBound(arg) }}
        >
        </Map>

    );
}

export default Maps;