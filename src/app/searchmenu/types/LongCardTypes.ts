export interface LongCardDataProps {
  _id: string;
  user: string;
  name: string;
  Role: string;
  image_url?: string;
  serve: number;
  ingredient: string[];
  kitchentools: string[];
  recipe: string[];
  review: string[];
  createdAt: Date;
  IsGenerated?: boolean;
  source: string;
  time: string;
}

export interface BlogsProps {
  data: LongCardDataProps[];
  total: number;
  page: number;
  limit: number;
}
