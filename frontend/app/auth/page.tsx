"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "frosted-ui";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-[75%] flex items-center justify-center w-full p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Join Now</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="http://localhost:3000/auth/google_oauth2" method="POST">
            <Button
              className="w-full flex flex-row items-center gap-2"
              variant="surface"
              style={{ cursor: "pointer" }}
              type="submit"
            >
              <Image src="/google.png" alt="Google" width={20} height={20} />
              Continue with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
