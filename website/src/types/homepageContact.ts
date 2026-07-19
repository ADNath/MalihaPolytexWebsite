export interface HomepageContactResponse {
  homepageContactId: number;
  title: string;

  address: string;
  mapUrl: string;

  phones: string[];
  emails: string[];

  officeHours: string;

  displayOrder: number;
  isActive: boolean;
}