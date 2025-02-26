import Nav from "../src/components/Nav.jsx";
import Add from "./pages/Add.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import Details from "./pages/Details.jsx";
import Favorite from "./pages/Favorite.jsx";
import Edit from "./pages/Edit.jsx";

function App() {
  return (
    <>
      <Nav></Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:log_id" element={<Details />} />
        <Route path="/favorites" element={<Favorite />}></Route>
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:log_id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
