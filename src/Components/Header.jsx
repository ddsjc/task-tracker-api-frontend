import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal/ModalWindow"; // Для регистрации
import ModalAuth from "./Modal/ModalAuthWindow"; // Для авторизации
import "../style.css";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAuthOpen, setIsModalAuthOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleModalAuthOpen = () => setIsModalAuthOpen(true);
  const handleModalAuthClose = () => setIsModalAuthOpen(false);

  return (
    <>
      <header>
        <h2 className="logo">Logo</h2>
        <nav className="navigation">
          <button onClick={handleModalOpen}>Sign-in</button>
          <button onClick={handleModalAuthOpen}>Log-in</button>
          <NavLink to="/home" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </nav>
      </header>
      {isModalOpen && <Modal handleClose={handleModalClose} />}
      {isModalAuthOpen && <ModalAuth handleClose={handleModalAuthClose} />}
    </>
  );
}

export default Header;
