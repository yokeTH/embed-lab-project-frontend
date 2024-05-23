"use server";

import { auth } from "@/auth";

export default async function getPet() {
  const session = await auth();
  const authType = "Bearer";
  const authToken = session?.user.token;

  const res = await fetch(
    "https://pet-sosiety-backend.sern-dev.workers.dev/pet",
    {
      headers: { Authorization: `${authType} ${authToken}` },
    }
  ).then((r) => r.json());

  return res.data;
}
