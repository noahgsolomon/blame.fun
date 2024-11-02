"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useUserStore } from "@/app/stores/user-store";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user, loading } = useUserStore();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        }),
      });

      if (response.ok) {
        window.location.href = "/";
        return { success: true };
      } else {
        const error = await response.json();
        console.error(error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: error.errors[0],
          variant: "destructive",
        });
        return { success: false, error: error.errors[0] };
      }
    } catch (error) {
      console.error("Failed to register:", error);
      return { success: false, error: "Failed to register" };
    }
  };

  if (user) {
    router.push("/");
  }

  if (loading || user) return null;

  return (
    <div className="h-[80vh] flex items-center justify-center w-full p-4">
      <AuthForm type="signup" onSubmit={handleSubmit} />
    </div>
  );
}
