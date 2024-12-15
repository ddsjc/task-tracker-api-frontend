import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import { useState } from "react";
import axios from "axios";
import "../../style.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    login: "",
    password: "",
    role: "EXECUTOR", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8081/auth/sign-in", formData, {headers: {
        "Content-Type": "application/json",
      },});
      if (response.status === 200 || response.status === 201) {
        // Redirect to /home
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Произошла ошибка при регистрации");
    }
  };

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modalWindow"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <button className="closeButton" onClick={handleClose}>
          ✖
        </button>
        <h2>Регистрация</h2>
        <form className="registrationForm">
          <label>
            Имя:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
          </label>
          <label>
            Фамилия:
            <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
          </label>
          <label>
            Логин:
            <input type="text" name="login" value={formData.login} onChange={handleInputChange} />
          </label>
          <label>
            Пароль:
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </label>
          <label>
            Роль:
            <select name="role" value={formData.role} onChange={handleInputChange}>
              <option value="ADMIN">Администратор</option>
              <option value="EXECUTOR">Исполнитель</option>
            </select>
          </label>
          <button type="button" onClick={handleRegister}>
            Зарегистрироваться
          </button>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;