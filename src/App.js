import "./App.css";
import "bulma/css/bulma.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Restore from "./pages/Restore";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restore" element={<Restore />} />
    </Routes>
  );
}

export default App;
