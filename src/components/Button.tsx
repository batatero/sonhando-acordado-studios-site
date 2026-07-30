import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "ghost";
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a className={`button button--${variant} ${className}`} {...props}>
      <span>{children}</span>
      <span className="button__arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

