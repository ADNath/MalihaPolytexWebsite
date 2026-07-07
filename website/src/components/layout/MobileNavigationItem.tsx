import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { NavigationItem } from "./navigation";

interface Props {
  item: NavigationItem;
  onClose: () => void;
}

export default function MobileNavigationItem({ item, onClose }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!item.children?.length) {
    return (
      <NavLink
        to={item.path ?? "/"}
        onClick={onClose}
        className="block rounded-xl px-4 py-3 text-lg font-medium text-gray-700 hover:bg-primary/10 hover:text-primary"
      >
        {item.name}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-lg font-medium text-gray-700 hover:bg-primary/10 hover:text-primary"
      >
        {item.name}
        <ChevronDown
          size={18}
          className={expanded ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>

      {expanded && (
        <div className="ml-4 mt-2 border-l border-gray-200 pl-4">
          {item.children.map((child) => (
            <MobileNavigationItem
              key={child.id}
              item={child}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}