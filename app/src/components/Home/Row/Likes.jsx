import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Likes = ({ bookId }) => {
  const [wishListedBooks, setWishListedBooks] = useState([]);

  const isBookWishListed = () => {
    return wishListedBooks.includes(bookId);
  };

  const handleWishList = () => {
    try {
      if (isBookWishListed()) {
        setWishListedBooks(wishListedBooks.filter((id) => id !== bookId));
      } else {
        setWishListedBooks([...wishListedBooks, bookId]);
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };
  localStorage.setItem("likes", wishListedBooks.length);

  return (
    <div role="button" style={{ cursor: "pointer" }} onClick={handleWishList}>
      {isBookWishListed() ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <FavoriteBorderIcon />
      )}{" "}
      {localStorage.getItem("likes") ?? 0}
    </div>
  );
};

export default Likes;