import type { PropsWithChildren } from "react";

export function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="max-w-4xl text-balance font-bold text-4xl text-bold tracking-tighter md:text-4xl lg:text-5xl xl:text-8xl">
      {children}
    </h1>
  );
}
