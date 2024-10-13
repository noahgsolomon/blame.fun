"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "./stores/user-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user } = useUserStore();
  return (
    <div className="w-full flex justify-end p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        {user && user.name && (
          <DropdownMenuContent>
            <div className="font-jetbrains">{user.name}</div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
