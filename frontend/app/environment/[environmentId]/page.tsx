"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { gql, useQuery, useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import Chat from "@/app/chat";
import {
  Copy,
  Home,
  Play,
  Terminal,
  Folder,
  File as FileIcon,
  Check,
  X,
  Trash,
} from "lucide-react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import { EnvironmentFile, GetEnvironmentQuery } from "@/__generated__/graphql";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tree, Folder as TreeFolder, File } from "@/components/ui/file-tree";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "frosted-ui";

const GET_ENVIRONMENT = gql`
  query GetEnvironment($id: ID!) {
    environment(id: $id) {
      id
      name
      createdAt
      updatedAt
      environmentFiles {
        id
        environmentId
        filename
        content
        fileExtension
        fileSize
        updatedAt
        createdAt
      }
    }
  }
`;

const RENAME_FILE = gql`
  mutation RenameFile($id: ID!, $filename: String!) {
    renameEnvironmentFile(id: $id, filename: $filename) {
      environmentFile {
        id
        filename
      }
      errors
    }
  }
`;

const DELETE_FILE = gql`
  mutation DeleteFile($id: ID!) {
    deleteEnvironmentFile(id: $id) {
      id
      errors
    }
  }
`;

const CREATE_INVITE_LINK = gql`
  mutation CreateInviteLink($environmentId: ID!, $code: String!) {
    createInviteLink(environmentId: $environmentId, code: $code) {
      invite {
        id
        code
        environmentId
      }
      errors
    }
  }
`;

const ADD_NEW_FILE = gql`
  mutation AddNewFile(
    $environmentId: ID!
    $filename: String!
    $content: String!
    $fileExtension: String!
  ) {
    addNewFile(
      environmentId: $environmentId
      filename: $filename
      content: $content
      fileExtension: $fileExtension
    ) {
      id
      errors
    }
  }
`;

export default function Page({
  params,
}: {
  params: { environmentId: string };
}) {
  const router = useRouter();
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [isNewFileDialogOpen, setIsNewFileDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [renameFileId, setRenameFileId] = useState<string | null>(null);
  const [newFileNameForRename, setNewFileNameForRename] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);

  const { data, loading, refetch } = useQuery<GetEnvironmentQuery>(
    GET_ENVIRONMENT,
    {
      variables: { id: params.environmentId },
    }
  );

  const [renameFileMutation] = useMutation(RENAME_FILE);
  const [deleteFileMutation] = useMutation(DELETE_FILE);
  const [createInviteLinkMutation] = useMutation(CREATE_INVITE_LINK);
  const [addNewFileMutation] = useMutation(ADD_NEW_FILE);

  useEffect(() => {
    if (
      data?.environment?.environmentFiles &&
      data.environment.environmentFiles.length > 0
    ) {
      const firstFile = data.environment.environmentFiles[0];
      if (firstFile && !currentFile) {
        console.log("Setting initial file:", firstFile.filename);
        setCurrentFile(firstFile.id);
      }
    }
  }, [data, currentFile]);

  const createInviteLink = async (environmentId: string, code: string) => {
    try {
      const result = await createInviteLinkMutation({
        variables: { environmentId, code },
      });
      console.log("Result:", result);

      if (result.data?.createInviteLink.invite) {
        navigator.clipboard.writeText(
          `http://localhost:3001/invite/${result.data.createInviteLink.invite.code}`
        );
        toast({
          title: "Copied to clipboard",
          description: `http://localhost:3001/invite/${code}`,
          variant: "success",
        });
      } else if (result.data?.createInviteLink.errors) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "Failed to generate invite link",
          variant: "destructive",
        });
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
    // Implement code execution logic here
  };

  const addNewFile = async () => {
    if (newFileName) {
      try {
        const result = await addNewFileMutation({
          variables: {
            environmentId: params.environmentId,
            filename: newFileName,
            content: "",
            fileExtension: getFileExtension(newFileName.split(".").pop() || ""),
          },
        });
        console.log("Result:", result);
        if (result.data?.addNewFile.id) {
          await refetch();
          setCurrentFile(result.data.addNewFile.id);
          toast({
            title: "File created",
            description: `${newFileName} has been created successfully.`,
          });
        } else if (result.data?.addNewFile.errors) {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "Failed to create new file",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error creating file:", error);
        toast({
          title: "Error",
          description: "Failed to create new file. Please try again.",
          variant: "destructive",
        });
      }
    }
    setIsNewFileDialogOpen(false);
    setNewFileName("");
  };

  const renameFile = async () => {
    if (renameFileId && newFileNameForRename) {
      try {
        console.log("Renaming file:", renameFileId, newFileNameForRename);
        await renameFileMutation({
          variables: { id: renameFileId, filename: newFileNameForRename },
        });
        await refetch();
        toast({
          title: "File renamed",
          description: `File has been renamed to ${newFileNameForRename}.`,
        });
      } catch (error) {
        console.error("Error renaming file:", error);
        toast({
          title: "Error",
          description: "Failed to rename file. Please try again.",
          variant: "destructive",
        });
      }
    }
    setIsRenameDialogOpen(false);
    setRenameFileId(null);
    setNewFileNameForRename("");
  };

  const deleteFile = async () => {
    if (deleteFileId) {
      try {
        const result = await deleteFileMutation({
          variables: { id: deleteFileId },
        });
        if (result.data?.deleteEnvironmentFile.id) {
          await refetch();
          if (currentFile === deleteFileId) {
            setCurrentFile(null);
          }
          toast({
            title: "File deleted",
            description: "File has been deleted successfully.",
          });
        } else {
          throw new Error("Failed to delete file");
        }
      } catch (error) {
        console.error("Error deleting file:", error);
        toast({
          title: "Error",
          description: "Failed to delete file. Please try again.",
          variant: "destructive",
        });
      }
    }
    setIsDeleteDialogOpen(false);
    setDeleteFileId(null);
  };

  const updateFileContent = (content: string) => {
    // Implement file content update logic here
  };

  const updateFileLanguage = (language: string) => {
    // Implement file language update logic here
  };

  const FileTreeItem = useCallback(
    ({ file }: { file: EnvironmentFile }) => (
      <ContextMenu>
        <ContextMenuTrigger
          onClick={() => {
            console.log("File clicked:", file.filename);
            setCurrentFile(file.id);
          }}
        >
          <File value={file.id}>{file.filename}</File>
        </ContextMenuTrigger>
        <ContextMenuContent className="cursor-pointer">
          <ContextMenuItem
            className="cursor-pointer"
            onSelect={() => {
              console.log("Add File selected");
              setIsNewFileDialogOpen(true);
            }}
          >
            Add File
          </ContextMenuItem>
          <ContextMenuItem
            className="cursor-pointer"
            onSelect={() => {
              console.log("Rename File selected:", file.filename);
              setRenameFileId(file.id);
              setNewFileNameForRename(file.filename || "");
              setIsRenameDialogOpen(true);
            }}
          >
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            className="cursor-pointer"
            onSelect={() => {
              console.log("Delete File selected:", file.filename);
              setDeleteFileId(file.id);
              setIsDeleteDialogOpen(true);
            }}
          >
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
    [
      setIsNewFileDialogOpen,
      setIsRenameDialogOpen,
      setIsDeleteDialogOpen,
      setCurrentFile,
    ]
  );

  if (!data && !loading) {
    router.push("/404");
  }

  if (!data || !data.environment || !data.environment.environmentFiles) {
    return null;
  }

  const files = data.environment.environmentFiles.reduce((acc, file) => {
    if (file) {
      acc[file.id] = file;
    }
    return acc;
  }, {} as Record<string, NonNullable<GetEnvironmentQuery["environment"]>["environmentFiles"][number]>);

  const currentFileData = currentFile ? files[currentFile] : null;

  console.log("Current file:", currentFileData?.filename);

  return (
    <div className="flex h-[75%] gap-4 items-start justify-center">
      <div className="w-[200px] h-full overflow-auto ">
        <Tree
          elements={[
            {
              id: "root",
              name: "Project",
              children: Object.values(files).map((file) => ({
                id: file.id,
                name: file.filename || "",
                isSelectable: true,
              })),
            },
          ]}
        >
          <TreeFolder element="Project" value="root">
            {Object.values(files).map((file) => (
              <FileTreeItem key={file.id} file={file} />
            ))}
          </TreeFolder>
        </Tree>
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-[600px] flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-muted-foreground">
            {currentFileData?.filename}
          </div>
          <Select
            value={currentFileData?.fileExtension || ""}
            onValueChange={(value) => updateFileLanguage(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="js">JavaScript</SelectItem>
              <SelectItem value="py">Python</SelectItem>
              <SelectItem value="c">C</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-[600px] rounded-md border">
          <Editor
            value={currentFileData?.content || ""}
            onValueChange={updateFileContent}
            padding={10}
            highlight={(code) =>
              highlight(
                code,
                currentFileData?.fileExtension === "js"
                  ? languages.js
                  : languages.python,
                currentFileData?.fileExtension || "js"
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

      <Dialog open={isNewFileDialogOpen} onOpenChange={setIsNewFileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New File</DialogTitle>
            <DialogDescription>
              Enter the name for your new file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={addNewFile}>
              Add File
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename File</DialogTitle>
            <DialogDescription>
              Enter the new name for your file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newFileNameForRename}
                onChange={(e) => setNewFileNameForRename(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              color="blue"
              style={{ cursor: "pointer", padding: "0.4rem" }}
              variant="soft"
              onClick={renameFile}
            >
              <Check className="mr-2 h-4 w-4" />
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="soft"
              color="gray"
              style={{ cursor: "pointer", padding: "0.4rem" }}
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="soft"
              color="red"
              style={{ cursor: "pointer", padding: "0.4rem" }}
              onClick={deleteFile}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
