import { useState } from "react";
import type { CreateBookDto } from "../types/book";

interface BookFormProps {
  onSubmit: (data: CreateBookDto) => void;
  initialData?: CreateBookDto;
}

export default function BookForm({ onSubmit, initialData }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [publishedYear, setPublishedYear] = useState(initialData?.publishedYear || new Date().getFullYear());
  const [read, setRead] = useState(initialData?.read || false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ title, author, publishedYear, read });
    setTitle("");
    setAuthor("");
    setPublishedYear(new Date().getFullYear());
    setRead(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4 rounded shadow">
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Ano de publicação"
        value={publishedYear}
        onChange={(e) => setPublishedYear(Number(e.target.value))}
        className="w-full p-2 border rounded"
        min={1000}
        max={new Date().getFullYear()}
        required
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={read} onChange={(e) => setRead(e.target.checked)} />
        Lido
      </label>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Salvar</button>
    </form>
  );
}
