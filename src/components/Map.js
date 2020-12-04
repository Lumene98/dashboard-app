import React, { useState } from "react";
import { useCubeQuery } from "@cubejs-client/react";
import MapGL, { Source, Layer } from "react-map-gl";

const Map = ({ setEntityIdFilter }) => {
  const [viewport, setViewport] = useState({
    latitude: 47.3,
    longitude: 8.6,
    zoom: 9,
  });

  const { resultSet } = useCubeQuery({
    dimensions: ["AirQualityObserved.location", "AirQualityObserved.entityId"],
    limit: 50000,
  });
  const data = {
    type: "FeatureCollection",
    features: [],
  };

  if (resultSet) {
    resultSet.tablePivot().forEach(item => {
      if (item["AirQualityObserved.location"]) {
        const splittedCoordinates = item["AirQualityObserved.location"].split(
          ","
        );
        const geometry = {
          coordinates: [splittedCoordinates[0], splittedCoordinates[1]],
          type: "Point",
        };
        data["features"].push({
          type: "Feature",
          properties: {
            id: item["AirQualityObserved.entityId"],
          },
          geometry,
        });
      }
    });
  }

  const onClickMap = event => {
    if (typeof event.features != "undefined") {
      const feature = event.features.find(f => f.layer.id === "point");
      if (feature) {
        setEntityIdFilter(feature.properties.id);
      }
    }
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "50vh" }}>
      <MapGL
        {...viewport}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
        mapStyle="mapbox://styles/lumene/cki95omj81cmu19o1l21n5m98"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        width="100%"
        height="100%"
        onClick={event => onClickMap(event)}
        interactiveLayerIds={["point"]}
      >
        <Source type="geojson" data={data}>
          <Layer
            {...{
              id: "point",
              type: "circle",
              paint: {
                "circle-radius": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  0,
                  3,
                  15,
                  11,
                ],
                "circle-stroke-width": 0,
                "circle-opacity": 0.7,
                "circle-color": "#ec407a",
              },
            }}
          />
        </Source>
      </MapGL>
    </div>
  );
};

export default Map;
