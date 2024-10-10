"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function Page({ params }: { params: { code: string } }) {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `http://localhost:3000/environments/${params.code}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.status === 404) {
        router.push("/404");
      } else {
        if (data.environmentId) {
          router.push(`/environment/${data.environmentId}`);
        }
      }
    })();
  }, []);

  return (
    <div className="flex h-[75%] items-center justify-center">
      <Loader className="size-6 animate-spin" />
    </div>
  );
}
