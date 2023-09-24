import { Button, TextField, styled } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { postComments } from "../../../services";

const StyledTextField = styled(TextField)({
  width: "100%",
  marginBottom: "10px",
  marginTop: "1em",
});

const StyledButton = styled(Button)({
  background: "#007BFF",
  color: "#fff",
});

const PostComments = ({ bookId }) => {
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationKey: ["postComment", bookId],
    mutationFn: postComments,
    onMutate: () => {
      setContent("");
      setIsDisabled(true);
    },
    onSuccess: (newComment) => {
      // This will move the latest comment to the top of the list
      queryClient.setQueryData(["getBookComments", bookId], (prevComments) => {
        return [newComment, ...prevComments];
      });
      setIsDisabled(false);
    },
    onError: (error) => {
      // Handle error logic here
      console.log(error);
    },
  });

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentMutation.mutateAsync({ bookId, content });
    } catch (error) {
      // Any error handling logic can be done in the onError callback
      console.log(error);
    }
  };

  return (
    <>
      <StyledTextField
        label="Add a Comment"
        variant="outlined"
        multiline
        rows={3}
        value={content}
        onChange={handleCommentChange}
        disabled={isDisabled}
      />

      <StyledButton onClick={handleCommentSubmit}>Post</StyledButton>
    </>
  );
};

export default PostComments;
