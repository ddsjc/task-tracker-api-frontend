import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal/ModalWindow"; // Для регистрации
import "../style.css";

function HeaderOtherPages() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);


  return (
    <>
      <header className="header-other">
        <h2 className="logo">Logo</h2>
        <nav className="navigation">
          <button onClick={handleModalOpen}>Profile</button>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
        </nav>
      </header>
      {isModalOpen && <Modal handleClose={handleModalClose} />}
    </>
  );
}

export default HeaderOtherPages;
