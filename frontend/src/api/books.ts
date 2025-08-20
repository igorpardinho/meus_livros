import type { Book, CreateBookDto, UpdateBookDto } from "../types/book";

const API_URL = "http://localhost:3000/books"; // sua API

export async function getBooks(): Promise<Book[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar livros");
  return res.json();
}

export async function createBook(data: CreateBookDto): Promise<Book> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao criar livro");
  return res.json();
}

export async function updateBook(id: number, data: UpdateBookDto): Promise<Book> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Erro ao atualizar livro");
  return res.json();
}

export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao deletar livro");
}
