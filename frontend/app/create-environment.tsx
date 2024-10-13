"use client";

import { toast } from "@/hooks/use-toast";
import { Button } from "frosted-ui";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateEnvironment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function createEnvironment() {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/environments", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.environmentId) {
        router.push(`/environment/${data.environmentId}`);
      }
    } catch (error) {
      console.error("Failed to create environment", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      disabled={loading}
      onClick={createEnvironment}
      variant="soft"
      color="purple"
      style={{ cursor: "pointer" }}
      className="w-full"
    >
      <Plus className="size-4" /> create environment
    </Button>
  );
}
