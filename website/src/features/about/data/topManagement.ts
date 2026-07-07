export interface ManagementMember {
  id: number;
  name: string;
  designation: string;
  image: string;
  message: string;
}

export const topManagement: ManagementMember[] = [
  {
    id: 1,
    name: "MD. MANZURUL HASSAN MASUD",
    designation: "Chairman",
    image: "/images/management/chairman.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    name: "MAHBUBUL HASAN",
    designation: "Managing Director",
    image: "/images/management/md.jpeg",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 3,
    name: "TARIK MD MAHABUBUL ISLAM",
    designation: "Executive Director",
    image: "/images/management/ed.jpeg",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];