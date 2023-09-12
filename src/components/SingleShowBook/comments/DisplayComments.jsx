import { Avatar, Typography, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getBookComments } from "../../../services";

const CommentContainer = styled("div")({
  marginTop: "20px",
  paddingTop: "20px",
  borderTop: "1px solid #ccc",
});

const CommentText = styled(Typography)({
  marginBottom: "10px",
  fontSize: "14px",
  color: "#555",
  padding: "10px",
});

const Comment = styled("div")({
  marginBottom: "10px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  display: "flex",
  alignItems: "flex-start",
});

const UserAvatar = styled(Avatar)({
  marginRight: "10px",
  textTransform: "uppercase",
});

const UserText = styled(Typography)({
  fontSize: "12px",
  color: "#888",
});

const DisplayComments = ({ bookId }) => {
  const { data: comments } = useQuery({
    queryKey: ["getBookComments", bookId],
    queryFn: () => getBookComments(bookId),
  });

  return (
    <CommentContainer>
      <Typography variant="h5">Comments:</Typography>
      {!comments?.length ? (
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Comments posted yet for this book.
        </Typography>
      ) : (
        comments?.map((comment) => {
          return (
            <Comment key={comment._id}>
              <UserAvatar>
                {comment?.user?.name
                  ? comment?.user?.name?.split("")[0]
                  : localStorage.getItem("username").split("")[0]}
              </UserAvatar>
              <div>
                <CommentText>{comment.content}</CommentText>
                <UserText>
                  Posted by:{" "}
                  {comment?.user?.name ?? localStorage.getItem("username")}
                </UserText>
              </div>
            </Comment>
          );
        })
      )}
    </CommentContainer>
  );
};

export default DisplayComments;
