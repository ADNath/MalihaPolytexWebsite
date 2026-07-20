export interface CareerDepartment {
  departmentId: number;
  name: string;
  displayOrder: number;
  isActive: boolean;
  createdDate?: string;
  createdBy?: string;
  modifiedDate?: string;
  modifiedBy?: string;
}

export interface CareerDepartmentRequest {
  name: string;
  displayOrder: number;
  isActive: boolean;
}