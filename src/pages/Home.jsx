import { Home } from "../components";
import { BookContextProvider } from "../context/books.context";
import HeaderPage from "./Header";

const HomePage = () => {
  return (
    <div>
      <BookContextProvider>
        <HeaderPage />
        <Home />
      </BookContextProvider>
    </div>
  );
};

export default HomePage;
