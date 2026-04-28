import { Box, Container, Tabs, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Signup from "../components/aunthentication/Signup";
import Login from "../components/aunthentication/Login";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW="xl">
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Lets Chat
        </Text>
      </Box>

      <Box
        bg="white"
        w="100%"
        p={4}
        borderRadius="lg"
        color="black"
        borderWidth="1px"
      >
        <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1" variant="plain">
          <Tabs.List mb="1em" borderBottom="none" display="flex">
            <Tabs.Trigger
              value="tab-1"
              borderRadius="full"
              px={4}
              py={2}
              width="50%"
              _selected={{ bg: "green", color: "white" }}
            >
              Login
            </Tabs.Trigger>

            <Tabs.Trigger
              value="tab-2"
              borderRadius="full"
              px={4}
              py={2}
              width="50%"
              _selected={{ bg: "green", color: "white" }}
            >
              Sign up
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab-1">{<Login />}</Tabs.Content>
          <Tabs.Content value="tab-2">{<Signup />}</Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
};

export default Homepage;
