import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NavigationItem as NavigationItemType } from "./navigation";

interface Props {
  item: NavigationItemType;
}

export default function NavigationItem({ item }: Props) {
  // Normal menu item
  if (!item.children) {
    return (
      <NavLink
        to={item.path!}
        className={({ isActive }) =>
          `group relative py-2 font-medium transition-colors duration-300 ${
            isActive
              ? "text-primary"
              : "text-gray-700 hover:text-primary"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {item.name}

            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-primary transition-all duration-300 ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </>
        )}
      </NavLink>
    );
  }

  // Dropdown menu
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 py-2 font-medium text-gray-700 transition-colors duration-300 hover:text-primary">
        {item.name}

        <ChevronDown
          size={16}
          className="transition-transform duration-300 group-hover:rotate-180"
        />
      </button>

      <div
        className="
          invisible
          absolute
          left-0
          top-full
          mt-3
          min-w-64 w-max
          rounded-xl
          border
          border-gray-100
          bg-white
          py-2
          opacity-0
          shadow-xl
          transition-all
          duration-200
          group-hover:visible
          group-hover:opacity-100
        "
      >
        {item.children.map((child) => {
          // Normal child
          if (!child.children) {
            return (
              <NavLink
                key={child.id}
                to={child.path!}
                className={({ isActive }) =>
                  `block px-5 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                  }`
                }
              >
                {child.name}
              </NavLink>
            );
          }

          // Fly-out submenu
          return (
            <div key={child.id} className="group/sub relative">
              <div
                className="
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  px-5
                  py-3
                  text-sm
                  text-gray-700
                  transition-colors
                  hover:bg-primary/5
                  hover:text-primary
                "
              >
                {child.name}

                <ChevronRight size={16} />
              </div>

              <div
                className="
                  invisible
                  absolute
                  left-full
                  top-0
                  ml-1
                  min-w-64 w-max
                  rounded-xl
                  border
                  border-gray-100
                  bg-white
                  py-2
                  opacity-0
                  shadow-xl
                  transition-all
                  duration-200
                  group-hover/sub:visible
                  group-hover/sub:opacity-100
                "
              >
                {child.children.map((subChild) => (
                  <NavLink
                    key={subChild.id}
                    to={subChild.path!}
                    className={({ isActive }) =>
                      `block px-5 py-3 text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                      }`
                    }
                  >
                    {subChild.name}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}