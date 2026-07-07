import type { Job } from "../types";

export const jobs: Job[] = [
  {
    id: "1",
    slug: "senior-production-manager",

    title: "Senior Production Manager",
    department: "Production",

    location: "Gazipur, Bangladesh",
    employmentType: "Full Time",
    experience: "5+ Years",

    vacancies: 2,

    postedDate: "10 July 2026",
    applicationDeadline: "30 July 2026",

    shortDescription:
      "Lead production operations while maintaining the highest quality and sustainability standards.",

    description:
      "We are looking for an experienced Senior Production Manager to oversee production planning, manufacturing efficiency, quality assurance, and continuous improvement initiatives across our production facilities.",

    responsibilities: [
      "Manage daily production operations.",
      "Lead production teams effectively.",
      "Ensure production quality standards.",
      "Monitor productivity and efficiency.",
      "Coordinate with maintenance and quality departments.",
    ],

    requirements: [
      "Bachelor's degree in Textile Engineering or related field.",
      "Minimum 5 years of relevant experience.",
      "Excellent leadership and communication skills.",
      "Strong analytical and problem-solving ability.",
    ],

    benefits: [
      "Competitive salary",
      "Festival bonuses",
      "Provident fund",
      "Career development opportunities",
    ],

    isActive: true,
  },

  {
    id: "2",
    slug: "quality-control-executive",

    title: "Quality Control Executive",
    department: "Quality Assurance",

    location: "Gazipur, Bangladesh",
    employmentType: "Full Time",
    experience: "2+ Years",

    vacancies: 1,

    postedDate: "12 July 2026",
    applicationDeadline: "05 August 2026",

    shortDescription:
      "Monitor production quality and ensure compliance with company standards.",

    description:
      "The Quality Control Executive will be responsible for inspecting products, maintaining quality documentation, and supporting continuous improvement activities.",

    responsibilities: [
      "Inspect finished products.",
      "Prepare quality reports.",
      "Coordinate corrective actions.",
    ],

    requirements: [
      "Bachelor's degree.",
      "Knowledge of quality management systems.",
      "Good communication skills.",
    ],

    benefits: [
      "Competitive salary",
      "Festival bonus",
      "Medical support",
    ],

    isActive: true,
  },
];