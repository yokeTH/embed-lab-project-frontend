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
          <div className="detail-wrapper bg-base-200 text-center flex flex-col items-center justify-center">
            <div className="">
              <div className=" bg-white rounded-full p-4 mb-8 w-[192px] h-[192px] flex justify-center items-center">
                <span className="text-[160px]">🐶</span>
              </div>
            </div>
            <div className=" rounded m-2">
              <span className="text-neutral text-lg">NAME</span> <br />
              <span className=" font-semibold text-3xl"> {filtered.name}</span>
            </div>
            <div className="rounded m-2">
              <span className="text-neutral text-lg">LOCATION</span> <br />
              <span className=" font-semibold text-3xl">
                ({filtered.record[0].latitude}, {filtered.record[0].longitude})
              </span>
            </div>
            <div className="rounded">
              <span className="text-neutral text-lg">LAST UPDATE</span> <br />
              <span className="font-semibold text-3xl">
                {new Date(filtered.record[0].updateAt).toLocaleString()}
              </span>
            </div>
            {/* {JSON.stringify(filtered)} */}
          </div>
        )}
        <div className={`map-wrapper ${deviceId && "max-md:hidden"}`}>
          {data && (
            <MapComponent pets={data.filter((e: any) => e.record.length > 0)} />
          )}
        </div>
      </div>
    </>
  );
};

export default Pet;
