"use client";

import { useEnvironmentStore } from "./stores/environment/environment-store";
import Link from "next/link";
import { Hash } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            className="w-full items-center flex flex-row gap-2"
            color="blue"
            key={environment.id}
          >
            <Hash className="size-3 opacity-60" />
            {environment.name}
          </Button>
        </Link>
      ))}
    </div>
  );
}
