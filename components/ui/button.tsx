import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", block, className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn ${variantClass[variant]} ${block ? "btn-block" : ""} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
