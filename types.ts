export interface Person {
  id: string;
  name: string;
  country: string;
  company: string;
  role?: string;
  linkedin: string;
  shortBio?: string;
  image?: string;
  es66: boolean;
}

export interface FilterState {
  search: string;
  countries: string[];
  companies: string[];
}
