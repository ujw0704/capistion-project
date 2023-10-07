
import { useEffect, useState } from "react";
import ".././Home.css";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import "./Row.css";
import { useBookContext } from "../../../context";
import { filterBooksWithCategory } from "../../../utils";
import { Box, CircularProgress, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Likes from "./Likes";

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
  const [filteredBooks, setFilteredBooks] = useState(books ?? []);

  useEffect(() => {
    const filterBooks = filterBooksWithCategory(books, endpoint);
    setFilteredBooks(filterBooks);
  }, [books, endpoint]);

  function titleEditor(data) {
    return data.length > 20 ? data.slice(0, 20) + "...." : data;
  }

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
                    {/* Like Component */}
                    <Likes bookId={book._id} />
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