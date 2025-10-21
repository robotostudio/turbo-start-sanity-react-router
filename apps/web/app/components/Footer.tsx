import { STUDIO_BASEPATH } from "~/sanity/constants";

export function Footer() {
  return (
    <header className="border-gray-100 border-t transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <div className="flex max-w-sm flex-1 flex-col items-end justify-end gap-2 text-right text-sm lg:flex-row lg:items-center lg:gap-5">
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href={STUDIO_BASEPATH}
          >
            Log in to embedded Sanity Studio
          </a>
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="https://sanity.io"
          >
            Sign up free at Sanity.io
          </a>
          <a
            className="hover:text-cyan-600 dark:hover:text-cyan-200"
            href="https://github.com/SimeonGriggs/sanity-react-router-template"
          >
            Star this project on GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
