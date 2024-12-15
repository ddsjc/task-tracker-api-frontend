import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './Pages/HomePage';
import ProjectPage from './Pages/ProjectPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/project" element={<ProjectPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
