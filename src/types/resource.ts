export type ResourceStatus = "draft" | "published";

export interface Resource {
  id?: string;

  title: string;
  description: string;

  grade: string;
  subject: string;
  pathway?: string;

  term: string;
  category: string;

  price: number;

  coverImageUrl: string;
  pdfUrl: string;

  status: ResourceStatus;

  downloads: number;
  sales: number;

  featured: boolean;

  createdAt: Date;
  updatedAt: Date;
}