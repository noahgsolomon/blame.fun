import * as React from "react";
import { cn } from "@/lib/utils";
import { TextArea } from "frosted-ui";

interface ChatInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ className, ...props }, ref) => (
    <TextArea
      onKeyDown={props.onKeyDown}
      value={props.value}
      placeholder={props.placeholder}
      variant="soft"
      onChange={props.onChange}
      className={cn(
        "max-h-12 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center h-16 resize-none",
        className
      )}
    />
  )
);
ChatInput.displayName = "ChatInput";

export { ChatInput };
