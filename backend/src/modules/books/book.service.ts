import { NotFoundError } from "../../errors/NotFoundError";
import { Book } from "./book.model";
import {
  BookResponseDto,
  bookResponseSchema,
  CreateBookDto,
  UpdateBookDto,
} from "./book.schemas";

export class BookService {
  async create(data: CreateBookDto): Promise<Book> {
    return await Book.create(data);
  }

  async findAll(): Promise<Book[]> {
    return await Book.findAll();
  }

  async findById(id: number): Promise<Book> {
    const book = await Book.findByPk(id);
    if (!book) {
      throw new NotFoundError("Livro não encontrado");
    }

    return book;
  }

  async update(id: number, data: UpdateBookDto) {
    const book = await this.findById(id);
    return await book.update(data);
  }

  async delete(id: number): Promise<void> {
    const book = await this.findById(id);

    await book.destroy();
  }

  toDtoBook(book: Book): BookResponseDto {
    return bookResponseSchema.parse(book.toJSON());
  }

  toDtoListBook(books: Book[]): BookResponseDto[] {
    return books.map((book) => this.toDtoBook(book));
  }
}
