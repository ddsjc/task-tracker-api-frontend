import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Backdrop from "../Backdrop/Backdrop";
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
      duration: 0.3,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ModalTaskWindow = ({ taskId, handleClose }) => {
  const [task, setTask] = useState(null); // Состояние для данных задачи
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибок
  const [formData, setFormData] = useState({ login: "" }); // Состояние для данных формы

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      // Делаем запрос на добавление исполнителя
      const response = await axios.patch(
        `http://localhost:8080/task/add-executor/${formData.login}?task_id=${taskId}`,
        {}, // Пустое тело, если больше данных не нужно передавать
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Пользователь добавлен!");
        handleClose(); // Закрыть модальное окно
      } else {
        alert("Произошла ошибка при добавлении пользователя.");
      }
    } catch (error) {
      console.error("Ошибка при добавлении исполнителя:", error);
      alert("Произошла ошибка при добавлении исполнителя.");
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/task/get-task/${taskId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setTask(response.data);
      } catch (err) {
        console.error("Ошибка при загрузке задачи:", err);
        setError("Не удалось загрузить задачу.");
      } finally {
        setLoading(false);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

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
          X
        </button>
        <h1>Детали задачи</h1>
        <p><strong>Название:</strong> {task.name}</p>
        <p><strong>Приоритет:</strong> {task.priority}</p>
        <p><strong>Дата создания:</strong> {task.createdAt}</p>
        <p><strong>Описание:</strong> {task.description}</p>
        <p><strong>Исполнитель:</strong> {task.executorLogin || "Не назначен"}</p>
        <p><strong>Комментарии:</strong> {task.comments}</p>
        <label>
          Введите логин пользователя
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleRegister}>
          Добавить пользователя
        </button>
      </motion.div>
    </Backdrop>
  );
};

export default ModalTaskWindow;
