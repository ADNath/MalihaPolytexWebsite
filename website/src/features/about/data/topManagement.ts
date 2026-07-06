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
    name: "MR. MANZURUL HASSAN",
    designation: "Chairman",
    image: "/assets/images/management/chairman.png",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    name: "MR. MAHBUBUL HASAN",
    designation: "Managing Director",
    image: "/assets/images/management/md.jpeg",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 3,
    name: "TARIK MD MAHABUBUL ISLAM",
    designation: "Executeive Director",
    image: "/assets/images/management/ed.jpeg",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];