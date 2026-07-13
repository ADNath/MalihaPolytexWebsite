export interface HomepageContactResponse {
  homepageContactId: number;

  title: string;

  phones: string[];

  emails: string[];

  displayOrder: number;

  isActive: boolean;
}

export interface HomepageContactRequest {
  title: string;

  phones: string[];

  emails: string[];

  displayOrder: number;

  isActive: boolean;
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
  };
}