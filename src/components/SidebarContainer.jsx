import { useState } from "react";
import { Sidebar } from "./Sidebar";
import Header from "./Header";

export const SidebarContainer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => {
    setIsOpen(true);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Header onOpen={openSidebar} />
      {children}
      <Sidebar onClose={closeSidebar} isOpen={isOpen} />
    </>
  );
};
