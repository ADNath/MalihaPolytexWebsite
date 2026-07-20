export interface JobApplication {
  jobApplicationId: number;
  jobId: number;
  jobTitle: string;
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
  createdDate: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
}

export interface JobApplicationStatusUpdateRequest {
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