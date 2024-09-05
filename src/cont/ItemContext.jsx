import { createContext, useState } from "react";

export const ItemsContext = createContext();

export const Provider = ({ children }) => {
  const [items, setItems] = useState([]);

  const reset = () => setItems([]);

  const addItem = (item) => {
    const alreadyExists = items.some((i) => i.id === item.id);

    if (alreadyExists) {
      const newItems = items.map((i) => {
        if (i.id === item.id) {
          return { ...i, quantity: i.quantity + item.quantity };
        } else {
          return i;
        }
      });
      setItems(newItems);
    } else {
      setItems((prev) => [...prev, item]);
    }
  };

 
  const removeItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return null; 
      }
      return item;
    }).filter(Boolean); 

    setItems(newItems);
  };

  return (
    <ItemsContext.Provider value={{ addItem, items, reset, removeItem }}>
      {children}
    </ItemsContext.Provider>
  );
};
