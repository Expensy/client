import { User } from './user';
import { Category } from './category';

export class Project {
  categories: Category[];
  created_at: Date;
  currency: string;
  id: number;
  members: User[];
  title: string;
  updated_at: Date;
}
