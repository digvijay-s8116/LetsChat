import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";

const Chats = () => {
  const { user } = ChatState;

  return <div style={{ width: "100%" }}></div>;
};

export default Chats;
