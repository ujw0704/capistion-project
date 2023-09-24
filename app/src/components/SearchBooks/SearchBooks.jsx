import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./SearchBooks.css";
import { useLoginContext } from "../../context";
import { useQuery } from "@tanstack/react-query";
import { getSearchedBooks } from "../../services";
import { useDebounce } from "use-debounce";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  styled,
} from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(5),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SearchBooks = () => {
  const navigate = useNavigate();
  const { inputValue } = useLoginContext();
  const [debouncedInputValue] = useDebounce(inputValue, 500);

  // Fetch Searched Books
  const { data: searchedBooks, isLoading } = useQuery({
    queryKey: ["search", debouncedInputValue],
    queryFn: () => getSearchedBooks(debouncedInputValue),
    enabled: debouncedInputValue !== "",
  });

  function handleShowBooks(e, book) {
    e.preventDefault();
    navigate("/SingleShowBook", {
      state: book,
    });
  }

  return (
    <Container sx={{ padding: "10px" }}>
      {!searchedBooks?.length && !isLoading && (
        <StyledTypography variant="h6">No Books to display</StyledTypography>
      )}
      {isLoading ? (
        <StyledBox>
          <CircularProgress />
        </StyledBox>
      ) : (
        <div className="searchBooks">
          {searchedBooks?.map((book, index) => {
            return (
              <Link
                className="bookLink"
                to=""
                onClick={(e) => handleShowBooks(e, book)}
                key={index}
              >
                <div className="searchBook">
                  <img src={book.image} alt="images"></img>
                  <p>
                    {book.bookType.slice(0, 1).toUpperCase() +
                      book.bookType.slice(1)}
                  </p>
                  <h1>
                    {book.title.length > 25
                      ? book.title.slice(0, 30) + "..."
                      : book.title}
                  </h1>
                  <h3>{`${"By - "}${book.author}`}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </Container>
  );
};
