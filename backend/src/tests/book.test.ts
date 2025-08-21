import { assert, beforeEach, describe, test } from "poku";
import request from "supertest";
import app from "..";
import { Book } from "../modules/books/book.model";

beforeEach(async () => {
  await Book.sync({ force: true, logging: false });

  await Book.create({
    title: "Livro teste",
    author: "Autor x",
    publishedYear: 2000,
    read: false,
  });
});

test(" GET /books , deve retornar lista de livros", async () => {
  const res = await request(app).get("/books");

  assert.equal(res.status, 200, "status deve ser 200");
  assert.deepStrictEqual(
    Array.isArray(res.body),
    true,
    "body deve ser um array"
  );
});

test("GET /books/:id , deve retornar apenas 1 livro", async () => {
  const res = await request(app).get("/books/1");

  assert.equal(res.status, 200, "status deve ser 200");
  assert.ok(res.body.id, "deve ter um campo id");
  assert.equal(res.body.id, 1, "id deve ser 1");
  assert.equal(res.body.title, "Livro teste", "title deve ser 'Livro teste'");
});

test("PUT /books/:id , deve atualizar um livro existente", async () => {
  const res = await request(app)
    .put("/books/1")
    .send({ title: "Livro atualizado", read: true });
  assert.equal(res.status, 200, "status deve ser 200");
  assert.equal(res.body.id, 1, "id deve ser 1");
  assert.equal(
    res.body.title,
    "Livro atualizado",
    "o title deve ser 'Livro atualizado'"
  );
  assert.equal(res.body.read, true, "o read deve ser 'true'");
});

test("DELETE /books/:id , deve deletar um livro existente", async () => {
  const res = await request(app).delete("/books/1");

  assert.equal(res.status, 204, "status deve ser 204");
  
});
