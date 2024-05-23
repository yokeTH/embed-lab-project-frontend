import DeviceProvider from "@/components/DeviceContext";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth/next";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <SessionProvider session={session}>
      <DeviceProvider>{children}</DeviceProvider>
    </SessionProvider>
  );
}
