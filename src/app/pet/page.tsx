"use client";
import "@/app/styles.css";
import { useDeviceContext } from "@/components/DeviceContext";
import Nav from "@/components/nav/nav";
import MapComponent from "@/components/map-pet/mapComponent";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getPet from "@/services/getPet";

const Pet = () => {
  const { deviceId } = useDeviceContext();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>();
  const filtered = data ? data.filter((e: any) => e.id == deviceId)[0] : {};

  const initData = () => {
    getPet().then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    initData();
  }, []);
  useEffect(() => {
    if (status == "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);
  return (
    <>
      <Nav />
      <div className="wrapper relative z-0">
        {deviceId && filtered && (
          <div className="detail-wrapper">
            <div className="max-sm:mt-16 p-4 bg-base-300 rounded m-2">
              <span className="text-lg font-semibold">name: </span>{" "}
              {filtered.name}
            </div>
            <div className="p-4 bg-base-200  rounded m-2">
              <span className="text-lg font-semibold">latitude: </span>{" "}
              {filtered.record[0].latitude}
            </div>
            <div className="p-4 bg-base-200 rounded m-2">
              <span className="text-lg font-semibold">longitude: </span>{" "}
              {filtered.record[0].longitude}
            </div>
            <div className="p-4 bg-base-200 rounded m-2">
              <span className="text-lg font-semibold">update: </span>{" "}
              {new Date(filtered.record[0].updateAt).toLocaleString()}
            </div>
            {/* {JSON.stringify(filtered)} */}
          </div>
        )}
        <div className={`map-wrapper ${deviceId && "max-md:hidden"}`}>
          {data && <MapComponent pets={data} />}
        </div>
      </div>
    </>
  );
};

export default Pet;
