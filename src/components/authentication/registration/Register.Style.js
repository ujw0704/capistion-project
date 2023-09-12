import { Box, Container, Paper, styled } from "@mui/material";
import { red } from "@mui/material/colors";


export const RegisterContainer = styled(Box)(({ theme }) => ({
    height: "100vh",
    backgroundColor: "#F5F4F2",
    padding: theme.spacing(1),
    overflowY: "scroll",
  }));

  export const RegisterCardContainer = styled(Container)(({ theme }) => ({
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "80%", // Use '80%' when screen size is below 'sm' breakpoint
    },
    marginTop: theme.spacing(20),
    padding: theme.spacing(1),
  
  }));


export const RegisterPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(1),
  borderRadius: "5px",
}));


 