import { Moon, Sun } from "lucide-react";
import { useFetcher } from "react-router";

import type { ThemePreference } from "~/types/themePreference";

export function ThemeToggle(props: { theme: ThemePreference }) {
  const cookieToggle = useFetcher();
  const isDarkMode = props.theme === "dark";

  return (
    <cookieToggle.Form action="/resource/toggle-theme" method="post">
      <button disabled={cookieToggle.state === "submitting"} type="submit">
        {isDarkMode ? (
          <Sun className="h-auto w-4" />
        ) : (
          <Moon className="h-auto w-4" />
        )}
        <div className="sr-only select-none">
          {isDarkMode ? "Light" : "Dark"} Mode
        </div>
      </button>
    </cookieToggle.Form>
  );
}
