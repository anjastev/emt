import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Books from "./pages/Books";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Welcome to Home Page</h1>} />
            <Route path="/books" element={<Books />} />
            <Route path="/authors" element={<div>Authors Page</div>} />
            <Route path="/countries" element={<div>Countries Page</div>} />
          </Route>
        </Routes>
      </Router>
  );
};

export default App;
