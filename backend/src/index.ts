import express from "express";

import { errorHandler } from "./middlewares/errorHandler";
import bookRoutes from "./modules/books/book.routes";
import { sequelize } from "./config/database";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(cors())

app.use("/books", bookRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("conexão com o SQLite estabelecida!");

    await sequelize.sync({ alter: true });
    console.log("tabelas sincronizadas");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Erro ao iniciar o servidor", err);
  }
};

startServer();

export default app;
