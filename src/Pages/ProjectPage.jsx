import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HeaderOtherPages from "../Components/HeaderOtherPages";
import ModalCreateTask from "../Components/Modal/ModalCreateTask";
import ModalTaskWindow from "../Components/Modal/ModalTaskWindow";
import "../style.css";

const ProjectPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get("projectId");

  const [states, setStates] = useState([]);
  const [tasks, setTasks] = useState({});
  const [newStateName, setNewStateName] = useState("");
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStateId, setCurrentStateId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const fetchStatesTasksUsers = async () => {
      try {
        // Fetch states and tasks
        const statesResponse = await axios.get(
          `http://localhost:8080/state/projects/fetch/${projectId}/task-states`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setStates(statesResponse.data);

        const tasksResponse = await Promise.all(
          statesResponse.data.map((state) =>
            axios.get(
              `http://localhost:8080/task/fetch/${state.id}`,
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            )
          )
        );

        const tasksData = tasksResponse.reduce((acc, res, index) => {
          acc[statesResponse.data[index].id] = res.data;
          return acc;
        }, {});

        setTasks(tasksData);

        // Fetch users
        const usersResponse = await axios.get(
          `http://localhost:8080/user/project/get-users/${projectId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    if (projectId) fetchStatesTasksUsers();
  }, [projectId]);

  const createState = async () => {
    if (!newStateName.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:8080/projects/create/${projectId}/task-states?task_state_name=${newStateName}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setStates((prevStates) => [...prevStates, response.data]);
      setTasks((prevTasks) => ({ ...prevTasks, [response.data.id]: [] }));
      setNewStateName("");
    } catch (error) {
      console.error("Ошибка создания состояния:", error);
    }
  };

  const addUserToProject = async () => {
    if (!newUserName.trim()) return;

    try {
      await axios.patch(
        `http://localhost:8080/project/add-user/${projectId}?user_name=${newUserName}`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setUsers((prevUsers) => [...prevUsers, newUserName]);
      setNewUserName("");
    } catch (error) {
      console.error("Ошибка добавления пользователя:", error);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceStateId = source.droppableId;
    const destStateId = destination.droppableId;

    if (sourceStateId === destStateId) {
      // Перетаскивание задачи внутри одного состояния
      const updatedTasks = Array.from(tasks[sourceStateId]);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);
      setTasks((prevTasks) => ({ ...prevTasks, [sourceStateId]: updatedTasks }));
    } else {
      // Перемещение задачи между состояниями
      const sourceTasks = Array.from(tasks[sourceStateId]);
      const destTasks = Array.from(tasks[destStateId]);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      destTasks.splice(destination.index, 0, movedTask);
      setTasks((prevTasks) => ({
        ...prevTasks,
        [sourceStateId]: sourceTasks,
        [destStateId]: destTasks,
      }));

      try {
        // Отправка PATCH запроса для обновления состояния задачи
        await axios.patch(
          `http://localhost:8080/task/change/task-state?task_state_id=${destStateId}&task=${draggableId}`,
          {},
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      } catch (error) {
        console.error("Ошибка перемещения задачи:", error);
      }
    }
  };

  

const openTaskModal = (taskId) => {
  setSelectedTaskId(taskId);
  setIsTaskModalOpen(true);
};

const closeTaskModal = () => {
  setSelectedTaskId(null);
  setIsTaskModalOpen(false);
};
  const openModal = (stateId) => {
    setCurrentStateId(stateId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStateId(null);
  };

  return (
    <div className="projects-page">
      <HeaderOtherPages />
      <h1>Состояния проекта</h1>

      <div className="create-state">
        <input
          type="text"
          value={newStateName}
          onChange={(e) => setNewStateName(e.target.value)}
          placeholder="Введите название состояния"
        />
        <button onClick={createState}>Создать состояние</button>
      </div>

      <div className="main-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="states-container">
            {states.map((state) => (
              <Droppable key={state.id} droppableId={state.id.toString()}>
                {(provided) => (
                  <div
                    className="state-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2>{state.name}</h2>
                    <button onClick={() => openModal(state.id)}>➕</button>
                    {tasks[state.id]?.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{task.name}</p>
                            <button onClick={() => openTaskModal(task.id)}>👁</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

        <div className="users-container">
          <h3>Пользователи проекта</h3>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.login}</li>
            ))}
          </ul>
          <input
            type="text"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Введите логин пользователя"
          />
          <button onClick={addUserToProject}>Добавить пользователя</button>
        </div>
      </div>

      {isModalOpen && (
        <ModalCreateTask stateId={currentStateId} onClose={closeModal} />
      )}

      {isTaskModalOpen && selectedTaskId && (
        <ModalTaskWindow
        taskId={selectedTaskId}
        handleClose={closeTaskModal}
        />
      )}
    </div>
  );
};

export default ProjectPage