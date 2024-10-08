import { Button } from "frosted-ui";
import Chat from "./chat";
import Header from "./header";

export default async function Page() {
  return (
    <div className="h-screen ">
      <Header />
      <div className="flex h-[75%] items-center justify-center">
        <div className="flex flex-col gap-2 items-center">
          <h1>FRONTEND</h1>
          <a href="http://localhost:3000">
            <Button
              variant="classic"
              color="purple"
              style={{ cursor: "pointer" }}
            >
              go to rails
            </Button>
          </a>
          <Chat />
        </div>
      </div>
    </div>
  );
}
