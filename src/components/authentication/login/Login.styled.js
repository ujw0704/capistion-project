import { Box, Container, Paper, styled } from "@mui/material";

export const LoginContainer = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: "#F5F4F2",
  padding: theme.spacing(1),
  overflowY: "scroll",
}));

export const LoginCardContainer = styled(Container)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "80%", // Use '80%' when screen size is below 'sm' breakpoint
  },
  marginTop: theme.spacing(20),
  padding: theme.spacing(1),
}));

export const LoginPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(1),
  borderRadius: "5px",
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  marginTop: "1em",
  width: "80%",
  [theme.breakpoints.down("sm")]: {
    width: "100%", // Use '100%' when screen size is below 'sm' breakpoint
  },
  padding: "10px",
  marginBottom: "40px",
}));
