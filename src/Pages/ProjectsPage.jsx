import "../style.css";
import { useEffect, useState } from "react";
import HeaderOtherPages from "../Components/HeaderOtherPages";
import axios from "axios";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/project/get-projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Ошибка загрузки проектов:", error);
      }
    };

    fetchProjects();
  }, []);

  const createProject = async () => {
    if (!newProjectName.trim()) return;

    try {
      await axios.post(
        `http://localhost:8080/projects/create?project_name=${newProjectName}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setNewProjectName("");
      window.location.reload();
    } catch (error) {
      console.error("Ошибка создания проекта:", error);
    }
  };

  return (
    <div className="projects-page">
      <HeaderOtherPages/>
      <h1>Проекты</h1>
      <div className="create-project">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Введите название проекта"
        />
        <button onClick={createProject}>Создать проект</button>
      </div>
      <div className="project-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => window.open(`/project/${project.id}?projectId=${project.id}`, "_blank")}
          >
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
//`/project/${project.id}`, "_blank"