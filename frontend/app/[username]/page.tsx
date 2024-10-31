"use client";

import * as React from "react";
import {
  CalendarDays,
  MapPin,
  Link2,
  Users,
  Star,
  GitFork,
  BookOpen,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ContributionCalendar = () => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Mock data for the contribution calendar
  const generateMockData = () => {
    const data = [];
    for (let i = 0; i < 53 * 7; i++) {
      data.push(Math.floor(Math.random() * 5));
    }
    return data;
  };

  const contributionData = generateMockData();

  const getContributionColor = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count < 2) return "bg-green-100 dark:bg-green-900";
    if (count < 3) return "bg-green-300 dark:bg-green-700";
    if (count < 4) return "bg-green-500 dark:bg-green-500";
    return "bg-green-700 dark:bg-green-300";
  };

  return (
    <div className="mt-6">
      <div className="flex gap-4">
        <div className="overflow-x-auto flex-grow" ref={scrollContainerRef}>
          <p className="text-xs text-muted-foreground">3,322 contributions</p>
          <div
            style={{ width: "max-content" }}
            className="border p-1 rounded-lg grid grid-cols-[repeat(53,1fr)] gap-1"
          >
            {contributionData.map((count, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      className={`w-3 h-3 rounded-sm ${getContributionColor(
                        count
                      )}`}
                    ></div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {count} contributions on {new Date().toDateString()}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <button className="hover:text-foreground">2024</button>
          <button className="hover:text-foreground">2023</button>
          <button className="hover:text-foreground">2022</button>
          <button className="hover:text-foreground">2021</button>
          <button className="hover:text-foreground">2020</button>
        </div>
      </div>
    </div>
  );
};

const ReadmeSection = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          shadcn / README.md
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <h1>👋 Hi, I'm shadcn</h1>
          <p>
            I'm a software engineer and open-source enthusiast. I love building
            tools that make developers' lives easier.
          </p>
          <h2>🚀 Featured Projects</h2>
          <ul>
            <li>
              <a href="#">shadcn/ui</a> - Beautifully designed components built
              with Radix UI and Tailwind CSS.
            </li>
            <li>
              <a href="#">next-template</a> - A Next.js 13 template with App
              Router support.
            </li>
          </ul>
          <h2>📫 Get in touch</h2>
          <p>
            <a href="https://twitter.com/shadcn">Twitter</a> •
            <a href="https://github.com/shadcn">GitHub</a> •
            <a href="https://shadcn.com">Website</a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Page() {
  return (
    <div className="container mx-auto p-6 md:p-24">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column: User info */}
        <div className="w-full md:w-1/4">
          <Avatar className="h-64 w-64 mx-auto md:mx-0">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mt-4">Shadcn</h1>
          <p className="text-xl text-muted-foreground">shadcn</p>
          <Button className="w-full mt-4">Edit profile</Button>
          <p className="mt-4">
            Building tools and services to help developers build better
            software.
          </p>
          <div className="flex items-center mt-4 text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            <span className="mr-4">100 followers</span>
            <span>50 following</span>
          </div>
          <div className="mt-4 text-muted-foreground">
            <div className="flex items-center mt-2">
              <MapPin className="mr-2 h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center mt-2">
              <Link2 className="mr-2 h-4 w-4" />
              <a
                href="https://ui.shadcn.com"
                className="text-blue-500 hover:underline"
              >
                https://ui.shadcn.com
              </a>
            </div>
            <div className="flex items-center mt-2">
              <CalendarDays className="mr-2 h-4 w-4" />
              <span>Joined June 2020</span>
            </div>
          </div>
        </div>

        {/* Right column: Tabs and content */}
        <div className="w-full md:w-3/4">
          <ReadmeSection />
          <Tabs defaultValue="overview" className="w-full mt-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder="Find a repository..."
                  className="w-full max-w-sm px-3 py-2 border rounded-md"
                />
                <div className="flex gap-2">
                  <Button variant="outline">Type</Button>
                  <Button variant="outline">Language</Button>
                  <Button variant="outline">Sort</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((repo) => (
                  <Card key={repo} className="flex flex-col h-full">
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-blue-500 hover:underline cursor-pointer text-lg">
                        shadcn/ui
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></div>
                        <span className="mr-4">TypeScript</span>
                        <Star className="mr-1 h-3 w-3" />
                        <span className="mr-4">1.2k</span>
                        <GitFork className="mr-1 h-3 w-3" />
                        <span>234</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="projects">Projects content</TabsContent>
            <TabsContent value="packages">Packages content</TabsContent>
          </Tabs>
          <ContributionCalendar />
        </div>
      </div>
    </div>
  );
}
