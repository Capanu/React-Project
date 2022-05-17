import React from 'react';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import "./pages/Home.css";
import Modal from './pages/Modal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />}>
        </Route>
        <Route  path="/modal" element={<Modal />}>
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
