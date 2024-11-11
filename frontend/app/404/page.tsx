import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 h-[60vh] items-center justify-center">
      404
      <Link className={buttonVariants()} href={"/"}>
        Return Home
      </Link>
    </div>
  );
}
