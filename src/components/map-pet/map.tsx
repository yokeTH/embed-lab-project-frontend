"use client";
import { useEffect } from "react";
// import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet.markercluster";
import L from "leaflet";

import "./custom-leaflet.css";
import interpolateColor from "@/utils/interpolateColor";
import getColorByValue from "@/utils/getColorByValue";
import { useDeviceContext } from "../DeviceContext";

interface Props {
  pets: {
    id: string;
    deviceId: string;
    name: string;
    ownerId: string;
    createAt: string;
    updateAt: string;
    record: { latitude: number; longitude: number; dustValue: number }[];
  }[];
}

const Map = ({ pets }: Props) => {
  const { setDeviceId } = useDeviceContext();
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
      pets.map((p) => p.record[0].latitude).reduce((s, v) => s + v, 0) /
        pets.length || 13.74,
      pets.map((p) => p.record[0].longitude).reduce((s, v) => s + v, 0) /
        pets.length || 100.53
    );

    const map = L.map("map", {
      center,
      zoom: 16,
      layers: [tileLayer],
      zoomControl: false,
      attributionControl: false,
    });

    map.on("click", () => {
      setDeviceId(null);
    });

    const markers = L.markerClusterGroup({
      maxClusterRadius: 120,
      iconCreateFunction: function (cluster) {
        const markers = cluster.getAllChildMarkers();
        let n = 0;
        // markers.forEach((e) => (n += e.number));
        n = Math.floor(markers.length);
        return L.divIcon({
          html: `${n}`,
          className: `pin ${getColorByValue(n)}`,
          iconSize: L.point(40, 40),
        });
      },
    });

    const drawMarker = () => {
      pets.forEach((point) => {
        const marker = L.marker(
          [point.record[0].latitude, point.record[0].longitude],
          {
            icon: new L.DivIcon({
              html: `<span class="badge badge-accent text-primary-content"> ${point.name} </span> <span class="pin round-full bg-black}">🐶</span> `,
              className: `flex flex-col items-center justify-center`,
              iconSize: L.point(120, 50),
            }),
          }
        );
        marker.addEventListener("click", () => {
          setDeviceId(point.id);
        });
        marker.number = point.record[0].dustValue;
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
