import { useEffect, useState } from "react";
import "./Product.css";
import { useBookContext } from "../../context/books.context";
import { filterBooksWithCategory } from "../../utils";
import { useNavigate } from "react-router-dom";

function ProductRow(props) {
  const navigate = useNavigate();
  const { books } = useBookContext();
  const { endpoint, heading } = props;
  const [filteredBooks, setFilteredBooks] = useState(books ?? []);

  useEffect(() => {
    const filterBooks = filterBooksWithCategory(books, endpoint);
    setFilteredBooks(filterBooks);
  }, [books, endpoint]);

  const handleSelection = (e, book) => {
    e.preventDefault();
    navigate("/SingleShowBook", {
      state: book,
    });
  };

  return (
    <div className="bookRow">
      <h1>{heading}</h1>
      <div className="book1">
        {filteredBooks.map((data, index) => {
          let colorPart = [
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0,
          ];
          let count = "#";

          for (let i = 0; i <= 6; i++) {
            count += colorPart[Math.floor(Math.random() * colorPart.length)];
          }
          return (
            <div
              className="singleBook"
              style={{
                background: `linear-gradient(to top, #f4f4f3,${count})`,
                cursor: "pointer",
              }}
              key={index}
              role="button"
              onClick={(e) => handleSelection(e, data)}
            >
              {/* <img src={(data?.volumeInfo?.imageLinks?.thumbnail) ? data.volumeInfo.imageLinks.thumbnail : ""} alt='chal' ></img> */}
              <img src={data?.image ?? ""} alt="product" />
              <h1>{data?.title ?? ""}</h1>
              {/* <h2>{}</h2> */}
              {/* <h3><span><RemoveRedEyeOutlinedIcon /></span><span><FavoriteBorderIcon /></span></h3> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductRow;
