import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, GitBranch, GitPullRequest, Star } from "lucide-react";

export default async function Page() {
  return (
    <main className="flex-1">
      <div className="grid items-start gap-6">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          {/* Sidebar */}
          <aside className="lg:w-1/5">
            <Card>
              <CardHeader>
                <CardTitle>Repositories</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col space-y-1">
                  <Link href="#" className="text-sm hover:underline">
                    github/docs
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    vercel/next.js
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    facebook/react
                  </Link>
                  <Link href="#" className="text-sm hover:underline">
                    tailwindlabs/tailwindcss
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Feed */}
          <div className="flex-1 lg:max-w-2xl">
            <Tabs defaultValue="feed" className="w-full">
              <TabsList>
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="forYou">For you</TabsTrigger>
              </TabsList>
              <TabsContent value="feed" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="@johndoe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <CardTitle className="text-sm font-medium">
                          John Doe
                        </CardTitle>
                        <CardDescription className="text-xs">
                          starred a repository
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <Book className="h-5 w-5" />
                      <span className="font-medium">facebook/react</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A declarative, efficient, and flexible JavaScript library
                      for building user interfaces.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="@janedoe"
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <CardTitle className="text-sm font-medium">
                          Jane Doe
                        </CardTitle>
                        <CardDescription className="text-xs">
                          created a new repository
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-5 w-5" />
                      <span className="font-medium">awesome-project</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A new awesome project that will change the world.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src="/placeholder-user.jpg"
                          alt="@bobsmith"
                        />
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <CardTitle className="text-sm font-medium">
                          Bob Smith
                        </CardTitle>
                        <CardDescription className="text-xs">
                          opened a pull request
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <GitPullRequest className="h-5 w-5" />
                      <span className="font-medium">Fix typo in README</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This PR fixes a small typo in the README file.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Explore repositories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">microsoft/vscode</h3>
                      <p className="text-xs text-muted-foreground">
                        Visual Studio Code
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Star className="mr-2 h-4 w-4" />
                      Star
                    </Button>
                  </li>
                  <li className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium">
                        tensorflow/tensorflow
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        An Open Source Machine Learning Framework for Everyone
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Star className="mr-2 h-4 w-4" />
                      Star
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}
