 import Row from "./Row/Row";
import Banner from "./Banner/Banner";
import { useBookContext } from "../../context";
import { Box, CircularProgress, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(5),
  padding: theme.spacing(30),
}));

export const Home = () => {
  const { isLoading } = useBookContext();
  return (
    <>
      {isLoading ? (
        <StyledBox>
          <CircularProgress size={100} />
        </StyledBox>
      ) : (
        <>
          <Banner />
          <Row endpoint={"mostpopular"} heading=" Most Popular" />
          <Row endpoint={"flower"} heading=" Flower Books" />
          <Row endpoint={"fantasy"} heading="Fantasy Books" />
          <Row endpoint={"romance"} heading="Romance Books" />
          <Row endpoint={"poetry"} heading="Poetry Books" />
        </>
      )}
    </>
  );
};
