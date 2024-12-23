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

const ModalAuth = ({ handleClose }) => {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
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
      const response = await axios.post("http://localhost:8081/auth/log-in", formData, {headers: {
        "Content-Type": "application/json",
      },});
      localStorage.setItem('token', response.data.token);
      if (response.status === 200 || response.status === 201) {
        // Redirect to /home
        window.location.href = "/projects";
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
        <h2>Авторизация</h2>
        <form className="registrationForm">
          <label>
            Логин:
            <input type="text" name="login" value={formData.login} onChange={handleInputChange} />
          </label>
          <label>
            Пароль:
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
          </label>
          <button type="button" onClick={handleRegister}>
            Авторизоваться
          </button>
        </form>
      </motion.div>
    </Backdrop>
  );
};

export default ModalAuth;