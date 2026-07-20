export interface JobOpening {
  jobId: number;
  title: string;
  departmentId: number;
  departmentName: string | null;
  jobLocation: string | null;
  employmentType: string | null;
  vacancy: number | null;
  experience: string | null;
 education: string | null;
  salary: string | null;
  applicationDeadline: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  benefits: string | null;
  displayOrder: number;
  isActive: boolean;
  createdDate: string;
  createdBy: string | null;
  modifiedDate: string | null;
  modifiedBy: string | null;
}