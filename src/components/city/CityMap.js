import React from "react"
import { Map, TileLayer, Marker, Popup } from "react-leaflet"

import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

const CityMap = ({ position, name }) => {
  console.log(position, name)
  return (
    <Map
      center={position}
      zoom={12}
      style={{ width: "500px", height: "500px" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={DefaultIcon}>
        <Popup>{name}</Popup>
      </Marker>
    </Map>
  )
}

export default CityMap
