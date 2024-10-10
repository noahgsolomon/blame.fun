"use client";

import { Button } from "frosted-ui";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import Link from "next/link";
import { Hash } from "lucide-react";

export default function UserEnvironments() {
  const { environments } = useEnvironmentStore();
  return (
    <div className="w-full flex flex-col gap-2">
      {environments?.map((environment) => (
        <Link
          className="w-full "
          href={`/environment/${environment.id}`}
          key={environment.id}
        >
          <Button
            variant="soft"
            style={{ cursor: "pointer" }}
            className="w-full"
            key={environment.id}
          >
            <Hash className="size-4" />
            {environment.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
