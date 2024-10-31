import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 h-[75%] items-center justify-center">
      404
      <Link href={"/"}>
        <Button color="blue">Return Home</Button>
      </Link>
    </div>
  );
}
