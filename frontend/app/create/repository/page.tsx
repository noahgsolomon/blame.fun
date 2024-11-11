"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lock, Globe } from "lucide-react";
import { useMutation } from "@apollo/client";
import { CREATE_REPOSITORY } from "@/lib/mutations";
import { useEffect } from "react";
import { useUserStore } from "@/app/stores/user-store";

export default function Page() {
  const router = useRouter();
  const { user } = useUserStore();
  // const [isPublic, setIsPublic] = React.useState(true);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [tokenSymbol, setTokenSymbol] = React.useState("");
  const [initialSupply, setInitialSupply] = React.useState("");
  const [license, setLicense] = React.useState("");

  const [createRepository, { data, loading, error }] =
    useMutation(CREATE_REPOSITORY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createRepository({
        variables: {
          attributes: {
            name,
            description,
            slug: name.toLowerCase().replace(/ /g, "-"),
          },
        },
      });
      console.log(result.data.createRepository.repository);
      router.push(
        `/${user?.username}/${result.data.createRepository.repository.slug}`
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Create a new repository</CardTitle>
          <CardDescription>
            A repository contains all project files, including the revision
            history. It also includes a token for your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Repository name</Label>
                <Input
                  id="name"
                  placeholder="e.g. my-awesome-project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="A short description of your project"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {/* <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public" className="flex items-center space-x-2">
                  {isPublic ? (
                    <>
                      <Globe className="h-4 w-4" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      <span>Private</span>
                    </>
                  )}
                </Label>
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol">Token Symbol</Label>
                <Input
                  id="tokenSymbol"
                  placeholder="e.g. MAP"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialSupply">Initial Token Supply</Label>
                <Input
                  id="initialSupply"
                  type="number"
                  placeholder="e.g. 1000000"
                  value={initialSupply}
                  onChange={(e) => setInitialSupply(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">License</Label>
                <Select value={license} onValueChange={setLicense}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a license" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mit">MIT License</SelectItem>
                    <SelectItem value="apache">Apache License 2.0</SelectItem>
                    <SelectItem value="gpl">
                      GNU General Public License v3.0
                    </SelectItem>
                    <SelectItem value="bsd">BSD 3-Clause License</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create repository
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
