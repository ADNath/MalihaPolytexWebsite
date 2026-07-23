export interface WalkInApplication {
  walkInApplicationId: number;

  fullName: string;
  email: string;
  phone: string;
  address?: string;

  highestEducation?: string;
  yearsOfExperience?: number;

  currentCompany?: string;
  currentDesignation?: string;

  expectedSalary?: string;
  coverLetter?: string;

  resumeFile: string;

  statusId: number;
  statusName: string;

  remarks?: string;

  appliedDate: string;
}

export interface WalkInApplicationRequest {
  fullName: string;
  email: string;
  phone: string;
  address?: string;

  highestEducation?: string;
  yearsOfExperience?: number;

  currentCompany?: string;
  currentDesignation?: string;

  expectedSalary?: string;
  coverLetter?: string;

  resumeFile: string;
}

export interface WalkInApplicationStatusUpdateRequest {
  statusId: number;
  remarks?: string;
}

export interface CareerApplicationStatus {
  statusId: number;
  statusName: string;
}

export const careerApplicationStatuses: CareerApplicationStatus[] = [
  {
    statusId: 1,
    statusName: "Pending",
  },
  {
    statusId: 2,
    statusName: "Under Review",
  },
  {
    statusId: 3,
    statusName: "Shortlisted",
  },
  {
    statusId: 4,
    statusName: "Interview Scheduled",
  },
  {
    statusId: 5,
    statusName: "Hired",
  },
  {
    statusId: 6,
    statusName: "Rejected",
  },
  {
    statusId: 7,
    statusName: "Withdrawn",
  },
];

export interface WalkInApplicationSearchRequest {
  page: number;
  pageSize: number;
  search?: string;

  designation?: string;
  minExperience?: number;
  maxExperience?: number;
  statusId?: number;

  sortBy?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface PagedResult<T> {
  items: T[];

  page: number;
  pageSize: number;

  totalCount: number;
  totalPages: number;

  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface DownloadResumesRequest {
  walkInApplicationIds: number[];
}