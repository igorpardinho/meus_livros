import { useEffect, useState } from "react";
import { getBooks, deleteBook, createBook, updateBook } from "../api/books";
import type { Book, CreateBookDto } from "../types/book";
import BookForm from "../components/BookForm";



export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchBooks(); }, []);

  async function fetchBooks() {
    setLoading(true); setError("");
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) { setError((err as Error).message); }
    finally { setLoading(false); }
  }

  async function handleCreate(data: CreateBookDto) {
    try {
      const newBook = await createBook(data);
      setBooks((prev) => [...prev, newBook]);
    } catch (err) { alert((err as Error).message); }
  }

  async function handleDelete(id: number) {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
    } catch (err) { alert((err as Error).message); }
  }

  async function toggleRead(book: Book) {
    try {
      const updated = await updateBook(book.id, { read: !book.read });
      setBooks((prev) => prev.map((b) => (b.id === book.id ? updated : b)));
    } catch (err) { alert((err as Error).message); }
  }

  if (loading) return <p className="p-6">Carregando...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">

      {/* Avatar animado */}
      <div className="flex justify-center mb-6 mt-12">
        <img src="/beroGo_sem_fundo.png" alt="Avatar" className="w-32 h-32 animate-bounce" />
      </div>

      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">📚 Meus Livros</h1>
        <BookForm onSubmit={handleCreate} />

        <ul className="space-y-3">
          {books.map((b) => (
            <li
              key={b.id}
              className="border border-dashed  rounded-xl p-4 shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-sm text-gray-300">{b.author} — {b.publishedYear}</div>
                <div className="text-xs text-gray-500">Criado em {new Date(b.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`px-3 py-1 rounded ${b.read ? "bg-emerald-500 text-white" : "bg-gray-700 text-gray-200"}`}
                  onClick={() => toggleRead(b)}
                >
                  {b.read ? "Lido ✅" : "Marcar como lido 📖"}
                </button>
                <button
                  className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleDelete(b.id)}
                >
                  Excluir 🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}