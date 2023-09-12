import { Link } from "react-router-dom";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api";
import { useLoginContext } from "../../context/login.context";

function Header() {
  const { isLoggedIn, setIsLoggedIn, inputValue, setInputValue } =
    useLoginContext();
  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    setInputValue(e.target.value);
    navigate("/searchbooks");
  }

  const handleLogOut = async (e) => {
    e.preventDefault();
    await axiosInstance.get("/auth/logout");
    setIsLoggedIn(false);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/sign");
  };

  return (
    <>
      <header>
        <div className="topHeader">
          <h1>BooksShelf</h1>
          <div className="searchButton">
            {isLoggedIn && (
              <form>
                <input
                  autoFocus
                  type="text"
                  placeholder="Enter product name"
                  value={inputValue}
                  onChange={handleChange}
                ></input>
              </form>
            )}
          </div>
          <ul>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li style={{ textTransform: "uppercase" }}>
              {isLoggedIn ? (
                localStorage.getItem("username")
              ) : (
                <Link to="/sign">Sign</Link>
              )}
            </li>{" "}
            &nbsp;
            <li>
              {isLoggedIn ? <button onClick={handleLogOut}>Logout</button> : ""}
            </li>
          </ul>
        </div>
        <div className="bottomHeader">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/product">Books</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/service">Service</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
