import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chats from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import { Toaster } from "./ui/toaster";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chats" element={<Chats />}></Route>
      </Routes>
    </div>
  );
}

export default App;
