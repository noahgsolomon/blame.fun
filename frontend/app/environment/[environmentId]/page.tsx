"use client";

import Chat from "@/app/chat";
import { v4 as uuid } from "uuid";
import { Button } from "frosted-ui";
import { Copy, Home, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { GetEnvironmentQuery } from "@/__generated__/graphql";
import { toast } from "@/hooks/use-toast";

export default function Page({
  params,
}: {
  params: { environmentId: string };
}) {
  const router = useRouter();
  const { data, loading } = useQuery<GetEnvironmentQuery>(
    gql`
      query GetEnvironment($id: ID!) {
        environment(id: $id) {
          id
          name
          createdAt
          updatedAt
        }
      }
    `,
    { variables: { id: params.environmentId } }
  );

  const createInviteLink = async (environmentId: string, code: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/environments/${environmentId}/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ invite: { code } }),
        }
      );

      const data = await response.json();
      if (data.status === 404) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Failed to generate invite link",
          variant: "destructive",
        });
      } else {
        if (data.status === "created") {
          navigator.clipboard.writeText(`http://localhost:3001/invite/${code}`);
          toast({
            title: "Copied to clipboard",
            description: `http://localhost:3001/invite/${code}`,
            variant: "success",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to generate invite link",
        variant: "destructive",
      });
    }
  };

  if (!data && !loading) {
    router.push("/404");
  }

  if (!data) {
    return <></>;
  }

  return (
    <div className="flex h-[75%] items-center justify-center">
      <div className="flex flex-col gap-2 w-[200px]">
        <Link href={"/"}>
          <Button
            color="purple"
            variant="soft"
            className="w-full"
            style={{ cursor: "pointer" }}
          >
            <Home className="size-4" /> go home
          </Button>
        </Link>
        <Button
          color="blue"
          variant="soft"
          onClick={() => createInviteLink(params.environmentId, uuid())}
          style={{ cursor: "pointer" }}
          className="w-full"
        >
          <Copy className="size-4" /> invite link
        </Button>
      </div>
      <Chat environmentId={params.environmentId} />
    </div>
  );
}
