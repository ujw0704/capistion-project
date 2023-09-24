import { Link } from "react-router-dom";
import "./Product.css";
import ProductRow from "./ProductRow";
import { useBookContext } from "../../context/books.context";
import { Box, CircularProgress, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(20),
}));

export const Product = () => {
  const { isLoading } = useBookContext();

  return (
    <>
      <div className="books">
        <div className="left">
          <h2>LIBRARY</h2>
          <ul>
            <li>
              <Link to="">Most popular</Link>
            </li>
            <li>
              <Link to="">Fiction</Link>
            </li>
            <li>
              <Link to="">Poetry</Link>
            </li>
            <li>
              <Link to="">fantasy</Link>
            </li>
            <li>
              <Link to="">Romance</Link>
            </li>
            <li>
              <Link to="">Flower</Link>
            </li>
            <li>
              <Link to="">Horror</Link>
            </li>
            <li>
              <Link to="">Cookbooks</Link>
            </li>
            <li>
              <Link to="">Essays</Link>
            </li>
            <li>
              <Link to="">Memoir</Link>
            </li>
            <li>
              <Link to="">Self-Help</Link>
            </li>
            <li>
              <Link to="">Short Stories</Link>
            </li>
          </ul>
        </div>
        <div className="right">
          {isLoading ? (
            <StyledBox>
              <CircularProgress />
            </StyledBox>
          ) : (
            <>
              <ProductRow endpoint="mostpopular" heading=" Most Popular" />
              <ProductRow endpoint="poetry" heading="Poetry Books" />
              <ProductRow endpoint="fantasy" heading="Fantasy Books" />
              <ProductRow endpoint="romance" heading="Romance Books" />
            </>
          )}
        </div>
      </div>
    </>
  );
};
