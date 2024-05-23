"use client";

import DropDownMenu from "./dropdownMenu";
import Logo from "./logo";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Nav() {
  const { data: session } = useSession();
  return (
    <>
      <nav className="navbar sm:shadow sm:drop-shadow sm:bg-base-100 z-50 absolute sm:relative gap-1 sm:flex">
        <div className="sm:flex-none">
          <Logo />
        </div>
        <div className="flex-1"></div>

        {session && (
          <a href="/pet" className="hidden btn btn-secondary flex-none sm:flex">
            {session?.user?.name + "'s pets"}
          </a>
        )}

        <div className="hidden flex-none btn btn-primary sm:flex">Join Us</div>
        {session ? (
          <div
            className="hidden flex-none btn btn-outline btn-primary sm:flex"
            onClick={() => {
              signOut();
            }}
          >
            SignOut
          </div>
        ) : (
          <div
            className="hidden flex-none btn btn-outline btn-primary sm:flex"
            onClick={() => {
              signIn();
            }}
          >
            SignIn
          </div>
        )}
        <DropDownMenu />
      </nav>
    </>
  );
}
