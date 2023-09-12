import { Product } from "../components";
import { BookContextProvider } from "../context/books.context";

const ProductPage = () => {
  return (
    <div>
      <BookContextProvider>
        <Product />
      </BookContextProvider>
    </div>
  );
};

export default ProductPage;
