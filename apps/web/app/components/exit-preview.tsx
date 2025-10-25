import { useEffect, useState } from "react";

export function ExitPreview() {
  const [inIframe, setInIframe] = useState<boolean>(true);

  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  if (inIframe) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-end justify-end p-2">
      <a
        className="pointer-events-auto flex items-center justify-center gap-2 bg-black p-4 font-bold text-white leading-none"
        href="/api/preview/disable"
        tabIndex={0}
      >
        Exit Preview Mode
      </a>
    </div>
  );
}
