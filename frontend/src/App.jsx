import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chats from "./pages/ChatPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </div>
  );
}

export default App;
