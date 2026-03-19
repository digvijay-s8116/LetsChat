import { Box, Container, Tabs, Text } from "@chakra-ui/react";
import React from "react";

const Homepage = () => {
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
      <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
        <Tabs.List>
          <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab-1">
          Tab 1: Content 
        </Tabs.Content>
        <Tabs.Content value="tab-2">
          Tab 2: Content 
        </Tabs.Content>
      </Tabs.Root>
      <Box></Box>
    </Container>
  );
};

export default Homepage;
