import { useState } from "react";
import Nav from "../src/components/Nav.jsx";
import AddLogForm from "./components/AddForm.jsx";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home.jsx";
import LogCard from "./components/LogCard.jsx";

function App() {
  return (
    <>
      <Nav></Nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
