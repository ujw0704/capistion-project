import express from "express";
import {
  addToCart,
  getAllBooks,
  getBook,
  getBookComments,
  postBookComments,
  postBookLikes,
  searchBooks,
} from "../controllers/index.js";
import { verifyToken } from "../middleware/verify-token.js";

const router = express.Router();

router.use(verifyToken);
router.post("/cart", addToCart);
router.get("/search", searchBooks);
router.get("/", getAllBooks);
router.post("/like/:bookId", postBookLikes);
router.route("/comment/:bookId").get(getBookComments).post(postBookComments);
router.get("/:bookId", getBook);

export default router;
