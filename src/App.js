import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import Search from "./Components/Search/Search";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/movies" element={<Search />} />
    </Routes>
  );
}

export default App;
