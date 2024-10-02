import React from "react";
import Home from "./Home";
import Task from "./Task";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
    </Router>
  );
};

export default App;
