import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import type { ComponentProps } from "react";
import { Link } from "react-router";

import type { SanityButtonProps } from "~/types";

type SanityButtonsProps = {
  buttons: SanityButtonProps[] | null;
  className?: string;
  buttonClassName?: string;
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
};

function SanityButton({
  text,
  href,
  variant = "default",
  openInNewTab,
  className,
  ...props
}: SanityButtonProps & ComponentProps<typeof Button>) {
  if (!href) {
    return <Button>Link Broken</Button>;
  }

  return (
    <Button
      variant={variant}
      {...props}
      asChild
      className={cn("rounded-[10px]", className)}
    >
      <Link
        aria-label={`Navigate to ${text}`}
        target={openInNewTab ? "_blank" : "_self"}
        title={`Click to visit ${text}`}
        to={href || "#"}
      >
        {text}
      </Link>
    </Button>
  );
}

export function SanityButtons({
  buttons,
  className,
  buttonClassName,
  size = "default",
}: SanityButtonsProps) {
  if (!buttons?.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)}>
      {buttons.map((button) => (
        <SanityButton
          key={`button-${button._key}`}
          size={size}
          {...button}
          className={buttonClassName}
        />
      ))}
    </div>
  );
}
