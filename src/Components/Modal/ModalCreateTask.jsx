import React, { useState } from "react";
import axios from "axios";
import "../../style.css";

const ModalCreateTask = ({ stateId, onClose }) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const createTask = async () => {
    try {
      await axios.post(
        `http://localhost:8080/task/create/${stateId}`,
        {
          name: taskName,
          priority: priority,
          description: description,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      onClose();
    } catch (error) {
      console.error("Ошибка создания задачи:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Создать задачу</h3>
        <input
          type="text"
          placeholder="Название задачи"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Приоритет"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={createTask}>Создать</button>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default ModalCreateTask;
