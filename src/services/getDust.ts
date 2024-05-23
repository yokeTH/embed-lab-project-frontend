"use server";

export type Dusts = DustItem[];
export interface DustItem {
  id: string;
  dustValue: number;
  latitude: number;
  longitude: number;
  createAt: string;
  updateAt: string;
  petId: string;
}

export default async function getDust(r: number = 5) {
  console.log("r", r);
  console.log(
    "url",
    `https://pet-sosiety-backend.sern-dev.workers.dev/dust?r=${r}`
  );
  const res = await fetch(
    `https://pet-sosiety-backend.sern-dev.workers.dev/dust?r=${r}`,
    {
      cache: "no-cache",
    }
  ).then((r) => r.json());

  // console.log(res.data);
  return res.data as Dusts;
}
