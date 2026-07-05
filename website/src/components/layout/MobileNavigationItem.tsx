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

  if (!item.children) {
    return (
      <NavLink
        to={item.path!}
        onClick={onClose}
        className={({ isActive }) =>
          `block rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
            isActive
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-primary/10 hover:text-primary"
          }`
        }
      >
        {item.name}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-lg font-medium text-gray-700 transition-colors hover:bg-primary/10 hover:text-primary"
      >
        {item.name}

        <ChevronDown
          size={18}
          className={`transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="mt-2 ml-5 space-y-2 border-l border-gray-200 pl-4">
          {expanded && (
            <div className="mt-2 ml-5 space-y-2 border-l border-gray-200 pl-4">
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
      )}
    </div>
  );
}
