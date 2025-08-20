import { Request, Response } from "express";
import { BookService } from "./book.service";
import {
  CreateBookDto,
  createBookSchema,
  UpdateBookDto,
  updateBookSchema,
} from "./book.schemas";

export class BookController {
  constructor(private bookService: BookService) {}

  async create(req: Request, res: Response) {
    const validated: CreateBookDto = createBookSchema.parse(req.body);
    const book = await this.bookService.create(validated);
    res.status(201).json(book);
  }

  async findAll(req: Request, res: Response) {
    const books = await this.bookService.findAll();
    const response = this.bookService.toDtoListBook(books);
    res.status(200).json(response);
  }

  async findById(req: Request, res: Response) {
    const book = await this.bookService.findById(Number(req.params.id));
    const response = this.bookService.toDtoBook(book);
    res.status(200).json(response);
  }

  async delete(req: Request, res: Response) {
    await this.bookService.delete(Number(req.params.id));
    res.status(204).send();
  }

  async update(req: Request, res: Response) {
    const validated: UpdateBookDto = updateBookSchema.parse(req.body);
    const book = await this.bookService.update(
      Number(req.params.id),
      validated
    );
    const response = this.bookService.toDtoBook(book);
    res.status(200).json(response);
  }
}
