export interface NavigationItem {
  id: string;
  name: string;
  path?: string;
  external?: boolean;
  children?: NavigationItem[];
}
export const navItems: NavigationItem[] = [
  {
    id: "home",
    name: "Home",
    path: "/",
  },
  {
    id: "about",
    name: "About Us",
    children: [
      {
        id: "top-management",
        name: "Top Management",
        path: "/about-us/top-management",
      },
      {
        id: "company-profile",
        name: "Company Profile",
        path: "/about-us/company-profile",
      },
      {
        id: "career",
        name: "Career",
        children: [
          {
            id: "current-opening",
            name: "Current Opening",
            path: "/career/current-opening",
          },
          {
            id: "walk-in",
            name: "Walk In Application",
            path: "/career/walk-in-application",
          },
        ],
      },
    ],
  },
  // {
  //   id: "products",
  //   name: "Products",
  //   path: "/product",
  // },
  // {
  //   id: "certificates",
  //   name: "Certificates",
  //   path: "/certificates",
  // },
  {
    id: "contact",
    name: "Contact",
    path: "/contact",
  },
];