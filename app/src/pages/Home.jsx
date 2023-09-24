import { Home } from "../components";
import { BookContextProvider } from "../context/books.context";

const HomePage = () => {
  return (
    <div>
      <BookContextProvider>
        <Home />
      </BookContextProvider>
    </div>
  );
};

export default HomePage;
