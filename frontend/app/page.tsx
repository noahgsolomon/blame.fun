import { Textarea } from "@/components/ui/textarea";
import { Button } from "frosted-ui";
import Chat from "./chat";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center">
        <Button variant="classic" color="purple" style={{ cursor: "pointer" }}>
          sup
        </Button>
        <Chat />
      </div>
    </div>
  );
}
