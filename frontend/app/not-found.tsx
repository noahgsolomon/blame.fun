import { Button } from "frosted-ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 h-[75%] items-center justify-center">
      404
      <Link href={"/"}>
        <Button variant="soft" style={{ cursor: "pointer" }}>
          Return Home
        </Button>
      </Link>
    </div>
  );
}
