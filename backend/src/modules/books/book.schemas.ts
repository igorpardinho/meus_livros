import z from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  author: z.string().min(1, "Autor obrigatório"),
  publishedYear: z.preprocess(
    (val) => Number(val),
    z
      .number()
      .min(1000, "Ano inválido")
      .max(new Date().getFullYear(), "Ano inválido")
  ),
  read: z.boolean().optional(),
});

export const bookResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  publishedYear: z.number(),
  read: z.boolean(),
  createdAt: z.coerce.date().transform((d) => d.toISOString()),
  updatedAt: z.coerce.date().transform((d) => d.toISOString()),
});

export type CreateBookDto = z.infer<typeof createBookSchema>;

export const updateBookSchema = createBookSchema.partial();

export type UpdateBookDto = z.infer<typeof updateBookSchema>;

export type BookResponseDto = z.infer<typeof bookResponseSchema>;
