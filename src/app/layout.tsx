import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider/SessionProvider";
import SideBar from "./components/SideBar/SideBar";
import "./globals.css";
import type { Metadata } from "next";
import { authOptions } from "./utils/authOptions";
import Login from "./components/Login/Login";
import ClientProvider from "./components/ClientProvider/ClientProvider";

export const metadata: Metadata = {
  title: "Chat Bot",
  description: "Chat Bot which provides valuable information about anything.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {session ? (
            <div className="flex">
              <div className="bg-darkBar max-w-xs h-screen overflow-y-auto md:min-w-[20rem]">
                <SideBar />
              </div>
              <ClientProvider />
              <div className="bg-dark flex-1">{children}</div>
            </div>
          ) : (
            <Login />
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
