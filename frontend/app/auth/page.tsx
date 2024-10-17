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
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const router = useRouter();

  if (isAuthenticated) {
    return router.push("/");
  }

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
              onClick={() => loginWithRedirect()}
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
