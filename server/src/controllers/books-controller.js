import { Book, Like, Comment } from "../model/index.js";

export const addToCart = async (req, res) => {
  try {
    const { aaya } = req.body;

    if (aaya) {
      for (let bookdata of aaya) {
        console.log(bookdata);
        const newBooks = new Book({
          title: bookdata.title,
          author: bookdata.author,
          image: bookdata.image,
          description: bookdata.description,
          bookType: "flower",
          publishedDate: bookdata.publishedDate,
          publisher: bookdata.publisher,
        });

        await newBooks.save();
        console.log("ho gya");
      }

      res.status(200).json(newBooks);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const searchBooks = async (req, res) => {
  try {
    const title = new RegExp(req.query.search, "i");
    const query = title ? { title: title } : {};
    const searchedBooks = await Book.find(query);
    res.status(200).json(searchedBooks);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getAllBooks = async (_req, res) => {
  try {
    const totalBooks = await Book.find();
    if (totalBooks) {
      res.status(200).json(totalBooks);
    } else {
      res.status(402).json("error");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookById = await Book.findById(bookId);

    if (!bookById || !bookId) {
      res.status(400).json("BookId does not exist");
    }
    res.status(200).json(bookById);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const postBookLikes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;

    // Check if the user has already liked the book
    const existingLike = await Like.findOne({
      book: bookId,
      user: userId,
    });

    if (existingLike) {
      // User already liked, so remove their like
      await existingLike.deleteOne();

      // Remove the like from the Book document
      await Book.findByIdAndUpdate(
        bookId,
        { $pull: { likes: existingLike._id } },
        { new: true }
      );

      res.status(200).json("Like removed successfully");
    } else {
      // User hasn't liked, so add their like
      const postLikes = new Like({
        book: bookId,
        user: userId,
      });

      await postLikes.save();

      // Add the like to the Book document
      await Book.findByIdAndUpdate(
        bookId,
        { $addToSet: { likes: postLikes._id } },
        { new: true }
      );

      res.status(201).json("Book Liked Successfully");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const postBookComments = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bookId } = req.params;
    const { content } = req.body;

    const postComments = new Comment({
      book: bookId,
      user: userId,
      content: content,
    });

    await postComments.save();

    await Comment.find({ book: bookId }).populate({
      path: "user",
      select: "username name", // Select only the required user fields
    });
    res.status(201).json(postComments);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getBookComments = async (req, res) => {
  const { bookId } = req.params;

  if (!bookId) {
    res.status(400).json("Book Id does not exist");
  }
  // Use the `populate` method to fetch specific user fields
  const bookComments = await Comment.find({ book: bookId })
    .sort({ content: -1 })
    .populate({
      path: "user",
      select: "username name", // Select only the required user fields
    });

  res.status(200).json(bookComments);
};
