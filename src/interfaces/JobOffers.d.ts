import { Offer } from "./offers";

export interface URLParams {
  q?:string;
  province?: string;
  subcategory?: string;
  category?: string[];
  city?: string[];
  country?: string;
  sinceDate?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryPeriod?: string;
  workday?:string;
  teleworking?:string;
  experienceMin?:string;
  contractType?:string;
  // Agrega otros parámetros de búsqueda según tus necesidades
}

export type IsForYou = "yes" | "no";

export interface JobOfferState {
  isForYou:IsForYou;
  allOffersForYoy?: Offer[];
  allOffers?: Offer[];
  isLoading: boolean;
  error: unknown | null;
  urlParams: URLParams;
  totalResults: number;
  pageSize: number;
  totalPages: number;
  currentPage: number;
}
