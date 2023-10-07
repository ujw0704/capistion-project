import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.css";
import { useLoginContext } from "../../../context/login.context";

import { useBookContext } from "../../../context";
import { getRandomBook } from "../../../utils";

function Banner() {
  const [banner, setBanner] = useState([]);
  const { books } = useBookContext();
  const { isLoggedIn } = useLoginContext();

  useEffect(() => {
    const bannerBook = getRandomBook(books);
    setBanner(bannerBook);
  }, []);

  return (
    <div className="banner">
      <div className="imageOverContent">
        <h1>BooksShelf</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search
        </p>
        {!isLoggedIn ? <Link to="/sign">Sign In</Link> : null}
      </div>
      <div className="image">
        <img src={banner?.image ?? ""} alt="banner" />
      </div>
    </div>
  );
}

export default Banner;
