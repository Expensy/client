import { Category } from './category';

export class Entry {
  category: Category;
  content: string;
  created_at: Date;
  date: Date;
  id: number;
  price: number;
  title: string;
  updated_at: Date;
}
