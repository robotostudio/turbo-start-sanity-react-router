import { Badge } from "@workspace/ui/components/badge";

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <Badge>Hello</Badge>
        </header>
        <div className="w-full max-w-[300px] space-y-6 px-4">
          <nav className="space-y-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
            <p className="text-center text-gray-700 leading-6 dark:text-gray-200">
              What&apos;s next?
            </p>
          </nav>
        </div>
      </div>
    </main>
  );
}
