import { useState } from "react";
import { Box, CircularProgress, Link, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getBook } from "../../services";
import { useQuery } from "@tanstack/react-query";
import PostComments from "./comments/PostComments";
import DisplayComments from "./comments/DisplayComments";

const StyledImage = styled("img")({
  width: "100%",
  maxWidth: 300,
  height: "auto",
  borderRadius: 4,
});

const StyledContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "20px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: 8,
  backgroundColor: "#ffffff",
});

const StyledDetails = styled("div")({
  flex: 1,
  marginLeft: "20px",
});

const StyledTitle = styled("h1")({
  margin: "0 0 10px",
});

const StyledSubtitle = styled("h2")({
  color: "#888",
  margin: "0",
});

const StyledDescription = styled("p")({
  fontSize: "16px",
  color: "#555",
  marginTop: "10px",
  lineHeight: 1.5,
});

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: theme.spacing(50),
  padding: theme.spacing(30),
}));

const StyledLink = styled(Link)({
  fontSize: "14px",
  cursor: "pointer",
  color: "#007BFF",
  textDecoration: "none",
});

export const SingleShowBook = () => {
  const { state } = useLocation();
  const { _id: bookId } = state;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const { data: bookData, isLoading } = useQuery({
    queryKey: ["getBook", bookId],
    queryFn: () => getBook(bookId),
  });

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const modifiedDescription = showFullDescription
    ? bookData?.description
    : bookData?.description.slice(0, 300) + "...";

  return (
    <StyledContainer>
      {isLoading ? (
        <StyledBox>
          <CircularProgress size={100} />
        </StyledBox>
      ) : (
        <>
          <StyledImage src={bookData?.image} alt="Book Cover" />
          <StyledDetails>
            <StyledTitle>{bookData?.title}</StyledTitle>
            <StyledSubtitle>
              {bookData?.author} & {bookData?.bookType}
            </StyledSubtitle>
            <StyledDescription>{modifiedDescription}</StyledDescription>
            {modifiedDescription.length > 300 && (
              <StyledLink onClick={toggleDescription}>
                {showFullDescription ? "Read Less" : "Read More"}
              </StyledLink>
            )}
            {/* Post Comment */}
            <PostComments bookId={bookId} />

            {/* Displays all the components */}
            <DisplayComments bookId={bookId} />
          </StyledDetails>
        </>
      )}
    </StyledContainer>
  );
};
