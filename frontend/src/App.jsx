import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chats from "./pages/ChatPage";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </div>
  );
}

export default App;
