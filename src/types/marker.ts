import "leaflet";

declare module "leaflet" {
  interface Marker {
    number: number;
  }
}
