"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { gql, useQuery } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import Chat from "@/app/chat";
import { Copy, Home, Play, Terminal } from "lucide-react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { GetEnvironmentQuery } from "@/__generated__/graphql";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import { Button } from "frosted-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page({
  params,
}: {
  params: { environmentId: string };
}) {
  const router = useRouter();
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Write your code here

console.log('hi')

print('hi')

const hi = async () => {
  console.log("sup")
}

hi();
`);
  const [terminalOutput, setTerminalOutput] = useState("");

  const { data, loading } = useQuery<GetEnvironmentQuery>(
    gql`
      query GetEnvironment($id: ID!) {
        environment(id: $id) {
          id
          name
          createdAt
          updatedAt
        }
      }
    `,
    { variables: { id: params.environmentId } }
  );

  const createInviteLink = async (environmentId: string, code: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/environments/${environmentId}/invite`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ invite: { code } }),
        }
      );

      const data = await response.json();
      if (data.status === 404) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Failed to generate invite link",
          variant: "destructive",
        });
      } else {
        if (data.status === "created") {
          navigator.clipboard.writeText(`http://localhost:3001/invite/${code}`);
          toast({
            title: "Copied to clipboard",
            description: `http://localhost:3001/invite/${code}`,
            variant: "success",
          });
        }
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Failed to generate invite link",
        variant: "destructive",
      });
    }
  };

  const getFileExtension = (lang: string) => {
    switch (lang) {
      case "javascript":
        return "js";
      case "py":
        return "py";
      case "c":
        return "c";
      default:
        return "txt";
    }
  };

  const executeCode = () => {};

  if (!data && !loading) {
    router.push("/404");
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-[75%] gap-4 items-center flex-col justify-center">
      <div className="w-[600px] flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-muted-foreground">
          file.{getFileExtension(language)}
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="py">Python</SelectItem>
            <SelectItem value="c">C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-[600px] overflow-hidden rounded-md border">
        <Editor
          value={code}
          onValueChange={setCode}
          padding={10}
          highlight={(code) =>
            highlight(
              code,
              language === "javascript" ? languages.js : languages.python,
              language
            )
          }
          style={{
            fontSize: 14,
          }}
        />
        <div className="flex flex-row justify-end bg-muted p-2">
          <Button
            variant="soft"
            style={{ cursor: "pointer" }}
            color="purple"
            onClick={executeCode}
          >
            <Play className="mr-2 h-4 w-4" /> Execute
          </Button>
        </div>
      </div>

      <div className="w-[600px] overflow-hidden rounded-md border relative">
        <div className="absolute top-0 left-0 bg-muted text-muted-foreground px-3 py-1 text-sm font-medium rounded-tl-md rounded-br-md">
          Console
        </div>
        <div className="min-h-[100px] p-4 pt-8">
          {/* Console output will go here */}
        </div>
      </div>

      <div className="w-[600px] overflow-hidden rounded-md border relative">
        <div className="absolute top-0 left-0 bg-muted text-muted-foreground px-3 py-1 text-sm font-medium rounded-tl-md rounded-br-md flex items-center">
          <Terminal className="mr-2 h-4 w-4" />
          Terminal
        </div>
        <div className="min-h-[100px] p-4 pt-8 font-mono text-sm whitespace-pre-wrap">
          {terminalOutput}
        </div>
      </div>

      <div className="flex gap-2 w-[400px]">
        <Link href="/" className="flex-1">
          <Button
            variant="soft"
            className="w-full"
            style={{ cursor: "pointer" }}
          >
            <Home className="mr-2 h-4 w-4" /> Go Home
          </Button>
        </Link>
        <Button
          variant="soft"
          color="blue"
          onClick={() => createInviteLink(params.environmentId, uuid())}
          style={{ cursor: "pointer" }}
          className="flex-1 w-full"
        >
          <Copy className="mr-2 h-4 w-4" /> Invite Link
        </Button>
      </div>
      <Chat environmentId={params.environmentId} />
    </div>
  );
}
