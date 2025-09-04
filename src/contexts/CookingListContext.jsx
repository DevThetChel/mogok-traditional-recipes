// CookingListContext.jsx
import { createContext, useState, useEffect } from "react";

const CookingListContext = createContext();

export const CookingListProvider = ({ children }) => {
  const [cookingList, setCookingList] = useState(() => {
    // Initialize state from localStorage directly to avoid a render cycle delay.
    const storedList = JSON.parse(localStorage.getItem("cooking-list")) || [];
    return storedList;
  });

  // Now, manage localStorage changes within the functions themselves for immediate effect
  const addToList = (id, date) => {
    setCookingList((prev) => {
      const newList = [...prev, { id, date }];
      localStorage.setItem("cooking-list", JSON.stringify(newList));
      return newList;
    });
  };

  const removeFromList = (id) => {
    setCookingList((prev) => {
      const newList = prev.filter((item) => Number(item.id) !== Number(id));
      localStorage.setItem("cooking-list", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <CookingListContext.Provider
      value={{ cookingList, addToList, removeFromList }}
    >
      {children}
    </CookingListContext.Provider>
  );
};

export default CookingListContext;
