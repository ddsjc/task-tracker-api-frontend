import "../style.css";
import { useEffect, useState } from "react";
import HeaderOtherPages from "../Components/HeaderOtherPages";
import axios from "axios";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("token"); // Получаем токен из localStorage

      if (!token) {
        setError("Необходимо авторизоваться");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/project/get-projects", {
          headers: {
            Authorization: `Bearer ${token}`, // Передаем токен в заголовке
          },
        });
        const formattedProjects = response.data.map((project) => ({
          ...project,
          created_at: new Date(project.created_at * 1000).toLocaleString(), // Преобразуем timestamp в строку
        }));
        setProjects(formattedProjects); // Сохраняем данные проектов
      } catch (err) {
        console.error("Ошибка при получении проектов:", err);
        setError("Не удалось загрузить проекты");
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="home-page-main-content">
      <HeaderOtherPages />
      <section className="projects-content">
        <h2 id="text">My projects</h2>
        {error && <p className="error">{error}</p>}
        {!error && (
          <ul className="project-list">
            {projects.map((project) => (
              <li key={project.id} className="project-item">
                <h3>{project.name}</h3>
                <p>Created at: {project.created_at}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
};

export default ProjectPage;
