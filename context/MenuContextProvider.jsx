"use client"
import { useState } from "react";
import { MenuContext } from "@/context/menuContext";

const MenuContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleSidebar }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
