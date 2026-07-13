export interface HeroSlideResponse {
  heroSlideId: number;

  title: string;

  subtitle?: string;

  description?: string;

  buttonText?: string;

  buttonUrl?: string;

  desktopImage: string;

  mobileImage?: string;

  displayOrder: number;

  isActive: boolean;
}