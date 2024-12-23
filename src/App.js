import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './Pages/HomePage';
import ProjectsPage from './Pages/ProjectsPage';
import ProjectPage from './Pages/ProjectPage';
import TaskPage from './Pages/TaskPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
          <Route path="/task/get-task/:taskId" element={<TaskPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
