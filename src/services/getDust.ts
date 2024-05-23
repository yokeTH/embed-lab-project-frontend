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
  const res = await fetch(
    `https://pet-sosiety-backend.sern-dev.workers.dev/dust?r=${r}`
  ).then((r) => r.json());

  return res.data as Dusts;
}
