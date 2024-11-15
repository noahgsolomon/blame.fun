import * as React from "react";
import { useQuery } from "@apollo/client";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SEARCH_FILES } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { GitTreeEntryDetail } from "@/app/[username]/[repositorySlug]/[[...path]]/page";
import { getFileIcon } from "@/lib/utils/file-icons";
import { useDebounce } from "@/lib/hooks/use-debounce";

interface FileSearchProps {
  username: string;
  repositorySlug: string;
}

type FileSearch = {
  id: number;
  searchFiles: {
    date: string;
    file: string;
    msg: string;
    name: string;
    oid: string;
    path: string;
    type: "blob" | "tree";
  }[];
};

export function FileSearch({ username, repositorySlug }: FileSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const debouncedQuery = useDebounce(inputValue, 500);
  const router = useRouter();

  const { data, loading } = useQuery(SEARCH_FILES, {
    variables: {
      username,
      slug: repositorySlug,
      query: debouncedQuery,
    },
    skip: !open || debouncedQuery.length < 2,
  });
  const fileSearch: FileSearch = data?.repositories[0];
  const hasResults = fileSearch?.searchFiles?.length > 0;

  console.log("fileSearch", fileSearch);

  const handleSelect = (path: string) => {
    router.push(`/${username}/${repositorySlug}/${path}`);
    setOpen(false);
  };

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Go to file"
          className="pl-8 h-9 w-[300px]"
          onClick={() => setOpen(true)}
          readOnly
        />
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search files..."
          value={inputValue}
          onValueChange={setInputValue}
        />
        <CommandList className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          )}

          {!loading && debouncedQuery.length < 2 && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              Type at least 2 characters to search...
            </div>
          )}

          {!loading && debouncedQuery.length >= 2 && !hasResults && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No files found matching "{debouncedQuery}"
            </div>
          )}

          {fileSearch && (
            <div className="divide-y">
              {fileSearch.searchFiles.map(
                (entry: GitTreeEntryDetail, index: number) => (
                  <div
                    key={entry.path}
                    className={`flex flex-col ${
                      index === fileSearch.searchFiles.length - 1
                        ? "rounded-b-lg"
                        : ""
                    }`}
                  >
                    <div
                      key={entry.path}
                      onSelect={() => handleSelect(entry.path)}
                      className="p-0"
                    >
                      <Link
                        href={`/${username}/${repositorySlug}/${entry.path}`}
                        className={`flex items-center px-3 py-2 w-full hover:bg-accent cursor-pointer group ${
                          index === fileSearch.searchFiles.length - 1
                            ? "rounded-b-lg"
                            : ""
                        }`}
                      >
                        <div className="flex items-center w-full">
                          <img
                            src={getFileIcon(entry.file, entry.type === "tree")}
                            className={`${
                              entry.type === "tree" ? "h-5 w-5" : "h-4 w-4"
                            } mr-2`}
                            alt=""
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col max-w-[50ch]">
                              <span className="text-xs text-muted-foreground truncate">
                                {entry.path.substring(
                                  0,
                                  entry.path.lastIndexOf(entry.file)
                                )}
                              </span>
                              <span className="text-sm font-medium truncate">
                                {entry.file}
                              </span>
                            </div>
                          </div>
                          {entry.msg && (
                            <div className="flex items-center justify-between flex-1 min-w-0 px-4">
                              <span className="text-xs text-muted-foreground truncate">
                                {entry.msg.split("\n")[0]}
                              </span>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {entry.date &&
                                  new Date(entry.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
