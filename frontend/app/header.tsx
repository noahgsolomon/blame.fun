"use client";

import {
  Avatar,
  DropdownMenuContent,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "frosted-ui";
import { useUserStore } from "./stores/user-store";
import { userInfo } from "os";

export default function Header() {
  const { user } = useUserStore();
  return (
    <div className="w-full flex justify-end p-4">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Avatar
            className="cursor-pointer"
            src="/logo.png"
            alt="icon"
            fallback="N"
          />
        </DropdownMenuTrigger>
        {user && user.name && (
          <DropdownMenuContent>{user.name}</DropdownMenuContent>
        )}
      </DropdownMenuRoot>
    </div>
  );
}
