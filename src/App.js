import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ExercisesList from "./components/exercises-list.component";
import EditExercises from "./components/edit-exercises.component";
import CreateExercises from "./components/create-exercises.component";
import CreateUsers from "./components/create-users.component";

function App() {
 
  return (
    <Router>
      <div className="container">
      
      <Navbar/>
      <br/>
      <Routes>
      <Route path="/" exact element={<ExercisesList/>} />
      <Route path="/edit/:id" element={<EditExercises/>} />
      <Route path="/create" element={<CreateExercises/>} />
      <Route path="/user" element={<CreateUsers/>}/>
      </Routes>
      </div>
    </Router>
  );
 
}

export default App;
