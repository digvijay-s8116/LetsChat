import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

const Chats = () => {
  const [chats, setChats] = useState([]);

  async function fetChats() {
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
    setChats(response.data);
  }

  useEffect(() => {
    fetChats();
  }, []);

  return (
    <div>
      Chats<Button>Click me</Button>
    </div>
  );
};

export default Chats;
