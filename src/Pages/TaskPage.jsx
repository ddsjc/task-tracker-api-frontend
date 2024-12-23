import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderOtherPages from "../Components/HeaderOtherPages";

const TaskPage = () => {
  const { taskId } = useParams(); // Получаем taskId из URL
  const [task, setTask] = useState(null); // Состояние для данных задачи
  const [loading, setLoading] = useState(true); // Состояние для загрузки
  const [error, setError] = useState(null); // Состояние для ошибок

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

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="task-page">
      <h1>Детали задачи</h1>
      {task && (
        <div className="task-details">
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Название:</strong> {task.name}</p>
          <p><strong>Приоритет:</strong> {task.priority}</p>
          <p><strong>Дата создания:</strong> {new Date(task.createdAt * 1000).toLocaleString()}</p>
          <p><strong>Описание:</strong> {task.description || "Нет описания."}</p>
          <h3>Комментарии</h3>
          {task.comments.length > 0 ? (
            <ul>
              {task.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          ) : (
            <p>Нет комментариев.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
