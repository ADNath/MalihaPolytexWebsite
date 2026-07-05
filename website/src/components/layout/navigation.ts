export interface NavigationItem {
  name: string;
  path?: string;
  children?: NavigationItem[];
}

export const navItems: NavigationItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    children: [
      {
        name: "Top Management",
        path: "/about-us/top-management",
      },
      {
        name: "Company Profile",
        path: "/about-us/company-profile",
      },
      {
        name: "Career",
        children: [
          {
            name: "Current Opening",
            path: "/career/current-opening",
          },
          {
            name: "Walk In Application",
            path: "/career/walk-in-application",
          },
        ],
      },
    ],
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Certificates",
    path: "/certificates",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];