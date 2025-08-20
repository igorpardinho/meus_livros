export interface Book {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateBookDto = Omit<Book, "id" | "createdAt" | "updatedAt">;
export type UpdateBookDto = Partial<CreateBookDto>;
