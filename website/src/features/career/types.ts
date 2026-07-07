export interface Job {
  id: string;
  slug: string;

  title: string;
  department: string;

  location: string;
  employmentType: string;
  experience: string;

  vacancies: number;

  applicationDeadline: string;
  postedDate: string;

  shortDescription: string;

  description: string;

  responsibilities: string[];

  requirements: string[];

  benefits: string[];

  isActive: boolean;
}