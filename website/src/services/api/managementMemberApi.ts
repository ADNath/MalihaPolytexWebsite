import api from "@/api/axios";


export interface ManagementMemberResponse {
  managementMemberId: number;
  name: string;
  designation: string;
  imageUrl: string;
  message: string;
  displayOrder: number;
  isActive: boolean;
}

export async function getManagementMembers() {
  const { data } = await api.get<{
    success: boolean;
    data: ManagementMemberResponse[];
  }>("/ManagementMembers");

  return data;
}