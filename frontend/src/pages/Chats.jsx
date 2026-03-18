import axios from "axios";
import { useEffect, useState } from "react";
import { Button,  } from "@chakra-ui/react";

const Chats = () => {
  const [chat, setChat] = useState([]);

  async function fetchhat() {
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
  }

  useEffect(() => {
    fetchhat();
  }, []);
  return (
    <div>
      Chats<Button>Click me</Button>
    </div>
  );
};

export default Chats;
