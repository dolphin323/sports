import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { CreateAthlete } from "./pages/athlete";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Link to={"/create-athlete"}>Create athlete </Link>
          <Link to={"/"}>Home</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-athlete" element={<CreateAthlete />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
