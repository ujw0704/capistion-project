import ReactDOM from "react-dom/client";
import { LoginContextProvider } from "./context/login.context";
import { BrowserRouter } from "react-router-dom";
import BookShelfApp from "./main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Don't refetch on tab/window focus
      // Add more default options here
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LoginContextProvider>
        <CssBaseline />
        <BookShelfApp />
      </LoginContextProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
