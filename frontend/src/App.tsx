import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home";
import { CreateAthlete } from "./pages/athlete";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navbar">
          <Link to={"/"} className="navbar-link">
            Home{" "}
          </Link>
          <Link to={"/create-athlete"} className="navbar-link">
            Create athlete{" "}
          </Link>
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
