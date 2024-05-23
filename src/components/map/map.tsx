"use client";
import { useEffect } from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet.markercluster";
import L from "leaflet";

import "./custom-leaflet.css";
import getColorByValue from "@/utils/getColorByValue";

interface Props {
  points: {
    latitude: number;
    longitude: number;
    dustValue: number;
  }[];
}

const Map = ({ points }: Props) => {
  useEffect(() => {
    const tileLayer = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & ' +
          '<a href="https://carto.com/attributions">CARTO</a>',
      }
    );

    const center = L.latLng(
      points.map((p) => p.latitude).reduce((s, v) => s + v, 0) /
        points.length || 13.74,
      points.map((p) => p.longitude).reduce((s, v) => s + v, 0) /
        points.length || 100.53
    );

    const map = L.map("map", {
      center,
      zoom: 16,
      layers: [tileLayer],
      zoomControl: false,
      attributionControl: false,
    });

    const markers = L.markerClusterGroup({
      maxClusterRadius: 120,
      iconCreateFunction: function (cluster) {
        const markers = cluster.getAllChildMarkers();
        let n = 0;
        markers.forEach((e) => (n += e.number));
        n = Math.floor(n / markers.length);
        const content = L.divIcon({
          html: String(n),
          className: `pin ${getColorByValue(n)}`,
          iconSize: L.point(40, 40),
        });
        return content;
      },
    });

    const drawMarker = () => {
      points.forEach((point) => {
        const marker = L.marker([point.latitude, point.longitude], {
          icon: new L.DivIcon({
            html: `<span class="text-[8px] badge badge-outline right-0 top-0">µg/M<sup>3</sup> </span> <span class="pin ${getColorByValue(
              point.dustValue
            )}">${Math.floor(point.dustValue)} </span>`,
            iconSize: L.point(100, 100),
            className: "flex flex-col items-center justify-center",
          }),
        });
        marker.number = point.dustValue;
        markers.addLayer(marker);
      });
    };

    drawMarker();
    map.addLayer(markers);

    const ZoomControl = L.Control.extend({
      onAdd: (map: L.Map) => {
        const container = L.DomUtil.create("div", "custom-zoom-control");

        const zoomIn = L.DomUtil.create("button", "", container);
        zoomIn.innerHTML = "<span>+</span>";
        zoomIn.onclick = () => {
          map.zoomIn();
        };

        const zoomOut = L.DomUtil.create("button", "", container);
        zoomOut.innerHTML = "<span>-</span>";
        zoomOut.onclick = () => {
          map.zoomOut();
        };

        return container;
      },
    });

    map.addControl(new ZoomControl({ position: "bottomright" }));

    var shownLayer: any, polygon: any;

    function removePolygon() {
      if (shownLayer) {
        shownLayer.setOpacity(1);
        shownLayer = null;
      }
      if (polygon) {
        map.removeLayer(polygon);
        polygon = null;
      }
    }

    markers.on("clustermouseover", function (a) {
      removePolygon();

      a.layer.setOpacity(0.2);
      shownLayer = a.layer;
      polygon = L.polygon(a.layer.getConvexHull());
      map.addLayer(polygon);
    });

    markers.on("clustermouseout", removePolygon);
    map.on("zoomend", removePolygon);

    // const zoomBtn = L.Control.extend({
    //   options: {
    //     position: "buttomright",
    //   },
    //   onAdd: (map) => {},
    // });
    return () => {
      map.remove(); // Cleanup map instance on component unmount
    };
  }, []);

  return <div id="map" className="h-full"></div>;
};

export default Map;
