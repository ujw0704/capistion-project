import { axiosInstance } from "../api";

// Function to generate request headers with the token
const getRequestHeaders = () => {
  const token = localStorage.getItem("token") || "";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllBooks = async () => {
  try {
    const response = await axiosInstance.get("/books", getRequestHeaders());
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getSearchedBooks = async (searchKey) => {
  try {
    const inputValue = searchKey || "";
    const result = await axiosInstance.get(
      `/books/search?search=${inputValue}`,
      getRequestHeaders()
    );
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getBook = async (bookId) => {
  try {
    const result = await axiosInstance.get(
      `/books/${bookId}`,
      getRequestHeaders()
    );
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const postComments = async ({ bookId, content }) => {
  try {
    const result = await axiosInstance.post(
      `/books/comment/${bookId}`,
      {
        content: content,
      },
      getRequestHeaders()
    );
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getBookComments = async (bookId) => {
  try {
    const result = await axiosInstance.get(
      `/books/comment/${bookId}`,
      getRequestHeaders()
    );
    return result.data;
  } catch (err) {
    console.log(err.message);
  }
};
