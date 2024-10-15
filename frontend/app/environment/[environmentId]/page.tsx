"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { gql, useQuery } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import Chat from "@/app/chat";
import {
  Copy,
  Home,
  Play,
  Terminal,
  Folder,
  File as FileIcon,
} from "lucide-react";
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
import {
  Tree,
  Folder as TreeFolder,
  File,
  CollapseButton,
  TreeViewElement,
} from "@/components/ui/file-tree";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function Page({
  params,
}: {
  params: { environmentId: string };
}) {
  const router = useRouter();
  const [files, setFiles] = useState<{
    [key: string]: { language: string; content: string };
  }>({
    "main.js": {
      language: "javascript",
      content: '// Write your code here\n\nconsole.log("Hello, World!");',
    },
  });
  const [currentFile, setCurrentFile] = useState("main.js");
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

  const executeCode = () => {
    setTerminalOutput(
      `Executing ${currentFile}...\n> ${files[currentFile].content}\n\nOutput:\n...`
    );
  };

  const addNewFile = (parentFolder: string = "") => {
    const newFileName = `newFile${Object.keys(files).length + 1}.js`;
    setFiles((prev) => ({
      ...prev,
      [newFileName]: { language: "javascript", content: "// New file" },
    }));
  };

  const renameFile = (oldName: string, newName: string) => {
    setFiles((prev) => {
      const { [oldName]: fileToRename, ...rest } = prev;
      return { ...rest, [newName]: fileToRename };
    });
    if (currentFile === oldName) {
      setCurrentFile(newName);
    }
  };

  const deleteFile = (fileName: string) => {
    setFiles((prev) => {
      const { [fileName]: _, ...rest } = prev;
      return rest;
    });
    if (currentFile === fileName) {
      setCurrentFile(Object.keys(files)[0]);
    }
  };

  const updateFileContent = (content: string) => {
    setFiles((prev) => ({
      ...prev,
      [currentFile]: { ...prev[currentFile], content },
    }));
  };

  const updateFileLanguage = (language: string) => {
    setFiles((prev) => ({
      ...prev,
      [currentFile]: { ...prev[currentFile], language },
    }));
  };

  const FileTreeItem = useCallback(
    ({ filename }: { filename: string }) => (
      <ContextMenu>
        <ContextMenuTrigger>
          <File value={filename} onClick={() => setCurrentFile(filename)}>
            {filename}
          </File>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="cursor-pointer"
            onSelect={() => addNewFile()}
          >
            New File
          </ContextMenuItem>
          <ContextMenuItem
            className="cursor-pointer"
            onSelect={() => {
              const newName = prompt("Enter new file name:", filename);
              if (newName) renameFile(filename, newName);
            }}
          >
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            className="cursor-pointer"
            onSelect={() => deleteFile(filename)}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
    [files]
  );

  const fileTreeElements: TreeViewElement[] = [
    {
      id: "root",
      name: "Project",
      children: Object.keys(files).map((filename) => ({
        id: filename,
        name: filename,
        isSelectable: true,
      })),
    },
  ];

  if (!data && !loading) {
    router.push("/404");
  }

  if (!data) {
    return null;
  }

  return (
    <div className="flex h-[75%] gap-4 items-start justify-center">
      <div className="w-[200px] h-full overflow-auto ">
        <ContextMenu>
          <ContextMenuTrigger>
            <Tree elements={fileTreeElements}>
              <TreeFolder element="Project" value="root">
                {Object.keys(files).map((filename) => (
                  <FileTreeItem key={filename} filename={filename} />
                ))}
              </TreeFolder>
            </Tree>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={() => addNewFile()}>
              New File
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-[600px] flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-muted-foreground">
            {currentFile}
          </div>
          <Select
            value={files[currentFile].language}
            onValueChange={updateFileLanguage}
          >
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
        <div className="w-[600px] rounded-md border">
          <Editor
            value={files[currentFile].content}
            onValueChange={updateFileContent}
            padding={10}
            highlight={(code) =>
              highlight(
                code,
                files[currentFile].language === "javascript"
                  ? languages.js
                  : languages.python,
                files[currentFile].language
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

        <div className="flex gap-2 w-[400px] mx-auto">
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
      </div>
      <Chat environmentId={params.environmentId} />
    </div>
  );
}
