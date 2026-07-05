import { navItems } from "./navigation";
import NavigationItem from "./NavigationItem";
export default function DesktopNavigation() {
  return (
    <nav className="hidden lg:flex items-center gap-12">
      {navItems.map((item) => (
        <NavigationItem key={item.id} item={item} />
      ))}
    </nav>
  );
}
