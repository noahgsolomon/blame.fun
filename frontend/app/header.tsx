"use client";

import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "frosted-ui";
import { useUserStore } from "./stores/user-store";

export default function Header() {
  const { user } = useUserStore();
  return (
    <div className=" w-full flex justify-end p-4">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Avatar
            className="cursor-pointer"
            src={user?.image ?? ""}
            alt="icon"
            fallback="N"
          />
        </DropdownMenuTrigger>
        {user && user.name && (
          <DropdownMenuContent>
            <div className="font-jetbrains">{user.name}</div>
          </DropdownMenuContent>
        )}
      </DropdownMenuRoot>
    </div>
  );
}
