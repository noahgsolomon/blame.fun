"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { gql, useMutation } from "@apollo/client";
import { useEnvironmentStore } from "@/app/stores/environment/environment-store";
import { JoinEnvironmentMutation } from "@/__generated__/graphql";

const JOIN_ENVIRONMENT = gql`
  mutation JoinEnvironment($code: String!) {
    joinEnvironment(code: $code) {
      id
    }
  }
`;

export default function Page({ params }: { params: { code: string } }) {
  const router = useRouter();
  const { refetch: dataRefetch } = useEnvironmentStore();
  const [joinEnvironmentMutation] =
    useMutation<JoinEnvironmentMutation>(JOIN_ENVIRONMENT);

  useEffect(() => {
    (async () => {
      const result = await joinEnvironmentMutation({
        variables: { code: params.code },
      });
      if (result.data?.joinEnvironment.id) {
        if (dataRefetch) {
          dataRefetch();
        }
        router.push(`/environment/${result.data.joinEnvironment.id}`);
      } else {
        router.push("/404");
      }
    })();
  }, []);

  return (
    <div className="flex h-[75%] items-center justify-center">
      <Loader className="size-6 animate-spin" />
    </div>
  );
}
