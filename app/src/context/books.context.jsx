/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { getAllBooks } from "../services";
import { useQuery } from "@tanstack/react-query";

const BookContext = createContext(null);

export const BookContextProvider = ({ children }) => {
  const {
    data: books,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["getAllBooks"],
    queryFn: getAllBooks,
  });

  const context = {
    books,
    isLoading,
    isError,
    refetch,
  };

  return (
    <BookContext.Provider value={context}>{children}</BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
