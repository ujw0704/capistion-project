/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ".././Home.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import book from "../../../assets/images/book.jpg";
import "./Row.css";
import { axiosInstance } from "../../../api";
import { useBookContext } from "../../../context";
import { filterBooksWithCategory } from "../../../utils";
import { Box, CircularProgress, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: theme.spacing(10),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Row = (props) => {
  const navigate = useNavigate();
  const { books, isLoading } = useBookContext();
  const { endpoint = "", heading = "" } = props;
  // const [isWishListed, setIsWishListed] = useState(false);
  const [wishListedBooks, setWishListedBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState(books ?? []);

  useEffect(() => {
    const filterBooks = filterBooksWithCategory(books, endpoint);
    setFilteredBooks(filterBooks);
  }, [books, endpoint]);

  function titleEditor(data) {
    return data.length > 20 ? data.slice(0, 20) + "...." : data;
  }

  const isBookWishListed = (bookId) => {
    return wishListedBooks.includes(bookId);
  };

  const handleWishList = async (bookId = "") => {
    try {
      const result = await axiosInstance.post(`/books/like/${bookId}`);
      if (result.status === 201) {
        if (isBookWishListed(bookId)) {
          setWishListedBooks(wishListedBooks.filter((id) => id !== bookId));
        } else {
          setWishListedBooks([...wishListedBooks, bookId]);
        }
      }
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleEyeIconClick = (e, book) => {
    e.preventDefault();
    navigate("/SingleShowBook", {
      state: book,
    });
  };

  return (
    <div className="wrapper">
      <h1>{heading}</h1>
      <div className="book">
        <div className="arrow">
          <Link to="">
            <ArrowBackIosIcon />
          </Link>
          <Link to="">
            <ArrowForwardIosIcon />
          </Link>
        </div>
        <>
          {!filteredBooks?.length && !isLoading && (
            <div>
              <StyledTypography variant="h6">
                No Books to display
              </StyledTypography>
            </div>
          )}
          {isLoading ? (
            <StyledBox>
              <CircularProgress />
            </StyledBox>
          ) : (
            filteredBooks?.map((book) => {
              return (
                <div className="box" key={book._id}>
                  <img src={book?.image ? book?.image : ""} alt="Book" />
                  <h1>{titleEditor(book.title)}</h1>
                  <h3>
                    <span
                      role="button"
                      onClick={(e) => handleEyeIconClick(e, book)}
                      style={{ cursor: "pointer" }}
                    >
                      <RemoveRedEyeOutlinedIcon />
                    </span>
                    <span>
                      <div
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleWishList(book._id)}
                      >
                        {isBookWishListed(book._id) ? (
                          <FavoriteIcon sx={{ color: "red" }} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                        {book.likes.length}
                      </div>
                    </span>
                  </h3>
                </div>
              );
            })
          )}
        </>
      </div>
    </div>
  );
};

export default Row;
