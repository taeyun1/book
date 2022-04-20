const express = require("express");
const router = express.Router();

const booksController = require("../controllers/books-controller");

router.get("/", booksController.getAllBooks); // booksController의 getAllBooks 함수를 사용하겠다
router.post("/", booksController.addBook);
router.get("/:bookId", booksController.getById); // 해당 책 고유 id에 접속하면 그 책을 보여줌
router.put("/:updateId", booksController.updateBook);
router.delete("/:deleteId", booksController.deleteBook);

module.exports = router;
