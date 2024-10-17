"use client";

import { toast } from "@/hooks/use-toast";
import { gql, useMutation } from "@apollo/client";
import { Button } from "frosted-ui";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { CreateEnvironmentMutation } from "@/__generated__/graphql";

const CREATE_ENVIRONMENT = gql`
  mutation CreateEnvironment {
    createEnvironment {
      id
    }
  }
`;

export default function CreateEnvironment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [createEnvironmentMutation] =
    useMutation<CreateEnvironmentMutation>(CREATE_ENVIRONMENT);
  const { refetch: dataRefetch } = useEnvironmentStore();

  async function createEnvironment() {
    try {
      setLoading(true);
      const result = await createEnvironmentMutation();
      if (result.data?.createEnvironment.id) {
        if (dataRefetch) {
          dataRefetch();
        }
        router.push(`/environment/${result.data.createEnvironment.id}`);
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to create environment", error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
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
