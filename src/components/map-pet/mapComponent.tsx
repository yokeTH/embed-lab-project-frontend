import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map-pet/map"), {
  ssr: false,
});

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

export default function MapComponent({ pets }: Props) {
  return <Map pets={pets} />;
}
