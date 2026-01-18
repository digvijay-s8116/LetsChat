import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chats from "./pages/Chats";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </>
  );
}

export default App;
