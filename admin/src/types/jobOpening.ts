export interface JobOpening {
  jobId: number;
  title: string;

  departmentId: number;
  departmentName?: string;

  jobLocation?: string;
  employmentType?: string;

  vacancy?: number;

  experience?: string;
  education?: string;
  salary?: string;

  applicationDeadline?: string;

  description: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;

  displayOrder: number;

  isActive: boolean;

  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
}

export interface JobOpeningRequest {
  title: string;

  departmentId: number;

  jobLocation?: string;
  employmentType?: string;

  vacancy?: number;

  experience?: string;
  education?: string;
  salary?: string;

  applicationDeadline?: string;

  description: string;
  responsibilities?: string;
  requirements?: string;
  benefits?: string;

  displayOrder: number;

  isActive: boolean;
}