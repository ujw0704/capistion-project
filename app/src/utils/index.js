export const filterBooksWithCategory = (books, category) => {
  return books?.filter((book) => book?.bookType === category);
};

export const getRandomBook = (bookData = []) => {
  return bookData[Math.floor(Math.random() * Number(bookData?.length))];
};

export * from "./auth-utils";
