import mongoose from "mongoose";
import { likeSchema } from "./likes.js";
import { commentSchema } from "./comments.js";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    // unique: false
  },
  image: {
    type: String,
    required: true,
    // unique:true
  },
  description: {
    type: String,
    required: true,
  },
  bookType: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  likes: [likeSchema],
  comments: [commentSchema],
});

export const Book = mongoose.model("Book", bookSchema);
