import { Box, Button } from "@chakra-ui/react";
import { Tooltip } from "../ui/tooltip";
import React, { useState } from "react";

const SideDrawer = () => {
  const [search, setSearch] = useState("");

  return (
    <Box>
      <Tooltip content="Search users to chat" showArrow>
        <Button variant="ghost">Search</Button>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
