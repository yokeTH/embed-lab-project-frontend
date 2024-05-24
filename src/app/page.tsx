import "./styles.css";
import MapComponent from "@/components/map/mapComponent";
import Nav from "@/components/nav/nav";
import getDust, { Dusts } from "@/services/getDust";

export default async function Home() {
  const r = await getDust();
  const g = r.reduce((p, c) => {
    (p[c["petId"]] = p[c["petId"]] || []).push(c);
    return p;
  }, {} as any);

  const avg = Object.keys(g).map((k) => {
    const l = (g[k] as Dusts).length;
    const e = (g[k] as Dusts).reduce(
      (p, c) => {
        p.dustValue += c.dustValue;
        p.latitude += c.latitude;
        p.longitude += c.longitude;
        return p;
      },
      {
        dustValue: 0,
        latitude: 0,
        longitude: 0,
      }
    );

    return {
      dustValue: e.dustValue / l,
      latitude: e.latitude / l,
      longitude: e.longitude / l,
    };
  });

  return (
    <>
      <Nav />
      <div className="wrapper relative z-0">
        <div className="map-wrapper">{r && <MapComponent points={avg} />}</div>
      </div>
    </>
  );
}
