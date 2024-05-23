import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/map"), {
  ssr: false,
  loading: () => <p>Loading</p>,
});

interface Props {
  points: {
    latitude: number;
    longitude: number;
    dustValue: number;
  }[];
}

export default function MapComponent({ points }: Props) {
  return <Map points={points} />;
}
