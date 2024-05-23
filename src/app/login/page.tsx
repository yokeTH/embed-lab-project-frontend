import getToken from "@/utils/getToken";

export default async function Login() {
  const token = () => {
    "use client";
    return localStorage.getItem("access_token");
  };
  return <span>{token()}</span>;
}
