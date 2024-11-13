import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  " inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary/90 text-primary-foreground hover:bg-primary/80 hover:scale-[101%] active:scale-[99%] shadow-sm",
        destructive:
          "bg-destructive/90 text-destructive-foreground hover:bg-destructive/80",
        outline:
          "border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary/90 text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        soft: "bg-opacity-20 hover:bg-opacity-30",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      color: {
        default: "",
        red: "bg-red-200/70 text-red-700 hover:bg-red-200/90 dark:bg-red-600/40 dark:text-red-200 dark:hover:bg-red-600/50",
        blue: "bg-blue-200/70 text-blue-700 hover:bg-blue-200/90 dark:bg-blue-600/40 dark:text-blue-200 dark:hover:bg-blue-600/50",
        green:
          "bg-green-200/70 text-green-700 hover:bg-green-200/90 dark:bg-green-600/40 dark:text-green-200 dark:hover:bg-green-600/50",
        yellow:
          "bg-yellow-200/70 text-yellow-700 hover:bg-yellow-200/90 dark:bg-yellow-600/40 dark:text-yellow-200 dark:hover:bg-yellow-600/50",
        purple:
          "bg-purple-200/70 text-purple-700 hover:bg-purple-200/90 dark:bg-purple-600/40 dark:text-purple-200 dark:hover:bg-purple-600/50",
        pink: "bg-pink-200/70 text-pink-700 hover:bg-pink-200/90 dark:bg-pink-600/40 dark:text-pink-200 dark:hover:bg-pink-600/50",
      },
    },
    compoundVariants: [
      {
        color: "red",
        variant: "soft",
        className:
          "bg-red-100/50 text-red-700 hover:bg-red-200/50 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-800/50",
      },
      {
        color: "blue",
        variant: "soft",
        className:
          "bg-blue-100/50 text-blue-700 hover:bg-blue-200/50 dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-800/50",
      },
      {
        color: "green",
        variant: "soft",
        className:
          "bg-green-100/50 text-green-700 hover:bg-green-200/50 dark:bg-green-900/50 dark:text-green-300 dark:hover:bg-green-800/50",
      },
      {
        color: "yellow",
        variant: "soft",
        className:
          "bg-yellow-100/50 text-yellow-700 hover:bg-yellow-200/50 dark:bg-yellow-900/50 dark:text-yellow-300 dark:hover:bg-yellow-800/50",
      },
      {
        color: "purple",
        variant: "soft",
        className:
          "bg-purple-100/50 text-purple-700 hover:bg-purple-200/50 dark:bg-purple-900/50 dark:text-purple-300 dark:hover:bg-purple-800/50",
      },
      {
        color: "pink",
        variant: "soft",
        className:
          "bg-pink-100/50 text-pink-700 hover:bg-pink-200/50 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800/50",
      },
      {
        color: "red",
        variant: "outline",
        className:
          "border-red-300 text-red-700 hover:bg-red-100/50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-900/50",
      },
      {
        color: "blue",
        variant: "outline",
        className:
          "border-blue-300 text-blue-700 hover:bg-blue-100/50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/50",
      },
      {
        color: "green",
        variant: "outline",
        className:
          "border-green-300 text-green-700 hover:bg-green-100/50 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/50",
      },
      {
        color: "yellow",
        variant: "outline",
        className:
          "border-yellow-300 text-yellow-700 hover:bg-yellow-100/50 dark:border-yellow-700 dark:text-yellow-300 dark:hover:bg-yellow-900/50",
      },
      {
        color: "purple",
        variant: "outline",
        className:
          "border-purple-300 text-purple-700 hover:bg-purple-100/50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/50",
      },
      {
        color: "pink",
        variant: "outline",
        className:
          "border-pink-300 text-pink-700 hover:bg-pink-100/50 dark:border-pink-700 dark:text-pink-300 dark:hover:bg-pink-900/50",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      color: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: "red" | "blue" | "green" | "yellow" | "purple" | "pink";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
