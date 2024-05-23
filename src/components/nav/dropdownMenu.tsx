import { signIn, signOut, useSession } from "next-auth/react";
import { MdMenu } from "react-icons/md";
import { useDeviceContext } from "../DeviceContext";

export default function DropDownMenu() {
  const { data: session } = useSession();
  return (
    <div className="sm:hidden dropdown dropdown-bottom dropdown-end absolute z-10 right-0 m-2">
      <div tabIndex={0} role="button" className="btn btn-primary">
        <MdMenu className="text-lg font-bold" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="/pet">Maps</a>
        </li>
        <li>
          {session ? (
            <a
              onClick={() => {
                signOut();
              }}
            >
              SignOut
            </a>
          ) : (
            <a
              onClick={() => {
                signIn();
              }}
            >
              SignIn
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}
