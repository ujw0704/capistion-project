import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../../api";

export const Cart = () => {
  const [books, setBooks] = useState([]);
  const [bookData, setBooksData] = useState([]);
  const [aaya, setAaya] = useState([]);

  // const api_key = "YOUR_GOOGLE_BOOKS_API_KEY";
  const api_key = "AIzaSyC1D8WIkBINjc6GWc63579oia1BGoNYFcc";

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=flower&maxResults=40&orderBy=newest&key=${api_key}`
      )
      .then((result) => {
        setBooks(result.data.items.slice(0, 10));
      });
    // console.log(result.data.items)
  }, []);

  console.log(books);

  useEffect(() => {
    setBooksData(
      books.map((bo) => ({
        title: bo.volumeInfo.title,
        author: bo.volumeInfo.authors[0],
        image: bo.volumeInfo.imageLinks?.thumbnail,
        description: bo.volumeInfo.description,
        publishedDate: bo.volumeInfo.publishedDate,
        publisher: bo.volumeInfo.publisher,
      }))
    );
  }, [books]);

  useEffect(() => {
    // Add all upcoming items from 'bookData' to the 'aaya' state
    setAaya((aaya) => [...aaya, ...bookData]);
    // setAaya([])
  }, [bookData]);

  console.log(aaya);
  // setBooksData(aagayi)

  useEffect(() => {
    axiosInstance.post("/books/cart", { aaya }).then((result) => {
      if (result.data === "books available") {
        console.log("aa gya data");
      } else {
        console.log("nhi aaya data");
      }
    });
  }, [aaya]);

  return (
    <div className="book">
      <div
        className="products"
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {books.map((book, index) => {
          return (
            <div
              key={index}
              className="product"
              style={{ width: "17%", margin: "10px", height: "300px" }}
            >
              <img
                style={{ width: "100%", height: "80%" }}
                alt="bookImg"
                src={
                  book.volumeInfo.imageLinks?.thumbnail
                    ? book.volumeInfo.imageLinks.thumbnail
                    : " "
                }
              ></img>
              <h2>
                {book.volumeInfo.authors[0].length > 20
                  ? book.volumeInfo.authors[0].slice(0, 18)
                  : book.volumeInfo.authors[0]}
              </h2>
              <p>
                {book.volumeInfo.title.length > 25
                  ? book.volumeInfo.title.slice(0, 25)
                  : book.volumeInfo.title}
              </p>

              <div className="footers"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
