export interface HomepageContactResponse {
  homepageContactId: number;

  title: string;

  phones: string[];

  emails: string[];

  displayOrder: number;

  isActive: boolean;
  address: string;
  mapUrl: string;
  officeHours: string;
}

export interface HomepageContactRequest {
  title: string;

  phones: string[];

  emails: string[];

  displayOrder: number;

  isActive: boolean;
  address: string;
  mapUrl: string;
  officeHours: string;
}

export function toHomepageContactRequest(
  contact: HomepageContactResponse,
): HomepageContactRequest {
  return {
    title: contact.title,
    phones: [...contact.phones],
    emails: [...contact.emails],
    displayOrder: contact.displayOrder,
    isActive: contact.isActive,
    address: contact.address,
    mapUrl: contact.mapUrl,
    officeHours: contact.officeHours,
  };
}
