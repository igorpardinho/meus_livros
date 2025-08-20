import { Router } from "express";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";

const router = Router();
const bookService = new BookService();
const bookController = new BookController(bookService);

router.post("/", (req, res) => bookController.create(req, res));
router.get("/", (req, res) => bookController.findAll(req, res));
router.get("/:id", (req, res) => bookController.findById(req, res));
router.put("/:id", (req, res) => bookController.update(req, res));
router.delete("/:id", (req, res) => bookController.delete(req, res));


export default router;