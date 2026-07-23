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

export interface WalkInApplicationResponse {
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
  createdDate: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
}