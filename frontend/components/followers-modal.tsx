import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Users } from "lucide-react";

interface User {
  id: string;
  username: string;
  name: string | null;
  avatar: string | null;
}

interface FollowersModalProps {
  users: User[];
  count: number;
  type: "followers" | "following";
}

export function FollowersModal({ users, count, type }: FollowersModalProps) {
  return (
    <Dialog>
      <DialogTrigger className="hover:underline cursor-pointer">
        <span className="flex items-center">
          {type === "followers" && (
            <span className="mr-4">{count} followers</span>
          )}
          {type === "following" && <span>{count} following</span>}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "followers" ? "Followers" : "Following"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
          {users.map((user) => (
            <Link
              href={`/${user.username}`}
              key={user.id}
              className="flex items-center gap-3 hover:bg-muted p-2 rounded-md"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar || ""} />
                <AvatarFallback>
                  {user.name?.[0] || user.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-sm text-muted-foreground">
                  @{user.username}
                </span>
              </div>
            </Link>
          ))}
          {users.length === 0 && <div>No users found</div>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
