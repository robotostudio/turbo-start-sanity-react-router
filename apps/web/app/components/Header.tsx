// import type {LayoutProps} from '~/components/Layout'
import { Logo } from "~/components/logo";;
import { ThemeToggle } from "~/components/theme-toggle";
import type { HomeDocument } from "~/types/home";
import type { ThemePreference } from "~/types/themePreference";

export function Header(props: { home: HomeDocument; theme: ThemePreference }) {
  return (
    <header className="border-gray-100 border-b transition-colors duration-1000 ease-in-out dark:border-gray-900">
      <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
        <Logo home={props.home} />
        <ThemeToggle theme={props.theme} />
      </div>
    </header>
  );
}
