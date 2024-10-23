"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "./stores/user-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user } = useUserStore();
  if (!user) return null;
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "DELETE",
        credentials: "include",
      });
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };
  return (
    <div className="w-full flex justify-end p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <AvatarImage src={`/${user?.image}`} />
            <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        {user && user.username && (
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  );
}
