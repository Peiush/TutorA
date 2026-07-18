import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: "none" | "sm" | "md" | "lg";
}

const elevationClass = {
  none: "",
  sm: "elev-sm",
  md: "elev-md",
  lg: "elev-lg",
};

export function Card({ elevation = "none", className = "", ...props }: CardProps) {
  return <div className={`card ${elevationClass[elevation]} ${className}`} {...props} />;
}
