import { useEffect, useState } from "react";

export function ExitPreview() {
  const [inIframe, setInIframe] = useState(true);
  useEffect(() => {
    setInIframe(window.self !== window.top);
  }, []);

  return inIframe ? null : (
    <div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-end justify-end p-2">
      <form
        action="/resource/preview"
        className="pointer-events-auto"
        method="POST"
      >
        <button
          className="bg-black p-4 font-bold text-white leading-none"
          type="submit"
        >
          Exit Preview Mode
        </button>
      </form>
    </div>
  );
}
