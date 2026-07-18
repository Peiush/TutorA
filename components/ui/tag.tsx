import { HTMLAttributes } from "react";

type TagVariant = "accent" | "accent-2" | "neutral" | "outline";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

const variantClass: Record<TagVariant, string> = {
  accent: "tag-accent",
  "accent-2": "tag-accent-2",
  neutral: "tag-neutral",
  outline: "tag-outline",
};

export function Tag({ variant = "neutral", className = "", ...props }: TagProps) {
  return <span className={`tag ${variantClass[variant]} ${className}`} {...props} />;
}
