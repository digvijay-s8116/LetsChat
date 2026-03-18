import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Chats from "./pages/ChatPage";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </>
  );
}

export default App;
