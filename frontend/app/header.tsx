"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "./stores/user-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Settings,
  Plus,
  GitPullRequest,
  CircleDot,
  Bell,
  Command,
  User,
  BookMarked,
  Bot,
  FolderKanban,
  Star,
  Code2,
  Building2,
  Building,
  Heart,
  BookOpen,
  HelpCircle,
  Users,
  LogOut,
  Globe,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Header() {
  const { user } = useUserStore();
  const [isCommandOpen, setIsCommandOpen] = React.useState(false);
  const router = useRouter();

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

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (!user) return null;

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center space-x-4 flex-1">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            <Globe className="h-4 w-4" />
          </Link>

          <div className="relative w-full max-w-[16rem]">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[16rem] h-8"
              onClick={() => setIsCommandOpen(true)}
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              /
            </kbd>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => router.push("/pulls")}
                >
                  <GitPullRequest className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pull requests</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => router.push("/issues")}
                >
                  <CircleDot className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Issues</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onSelect={() => router.push("/create/repository")}
                    >
                      Create repository
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>Create new</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => router.push("/notifications")}
                >
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Sheet>
            <SheetTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={`/${user?.image}`} />
                <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
              </Avatar>
            </SheetTrigger>
            <SheetContent className="w-80 rounded-l-2xl border">
              <SheetHeader className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={`/${user?.image}`} />
                    <AvatarFallback>{user?.username?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{user?.username}</span>
                    <span className="text-sm text-muted-foreground">
                      he's literally me
                    </span>
                  </div>
                </div>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <User className="h-4 w-4" /> Your profile
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <BookMarked className="h-4 w-4" /> Your repositories
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Star className="h-4 w-4" /> Your stars
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                  >
                    <Heart className="h-4 w-4" /> Your sponsors
                  </Button>
                </div>
                <Separator />
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Button>
                </div>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
