import { useState } from "react";
import Nav from "../src/components/Nav.jsx";
import AddLogForm from "./components/AddForm.jsx";
import "./App.css";

function App() {
  return (
    <>
      {" "}
      <Nav></Nav>
      <AddLogForm></AddLogForm>
    </>
  );
}

export default App;
