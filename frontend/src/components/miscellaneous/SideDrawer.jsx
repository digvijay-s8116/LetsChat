import { Box, Button, Menu, Text } from "@chakra-ui/react";
import { Bell, ChevronDown, Search } from "lucide-react";
import { Tooltip } from "../ui/tooltip";
import { Avatar } from "../ui/avatar";
import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import ProfileModel from "./ProfileModel";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchresult, setSearchResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
    >
      <Tooltip content="Search users to chat" showArrow placement="bottom-end">
        <Button variant="ghost">
          <Search size={20} />
          <Text display={{ base: "none", md: "flex" }} px="4px">
            Search User
          </Text>
        </Button>
      </Tooltip>

      <Text>Lets Chat</Text>

      <Box display="flex" alignItems="center" gap={2}>
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" p={1}>
              <Bell size={20} />
            </Button>
          </Menu.Trigger>

          <Menu.Content>
            <Menu.Item value="notifications">No new notifications</Menu.Item>
          </Menu.Content>
        </Menu.Root>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" px={2}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
              <ChevronDown size={20} />
            </Button>
          </Menu.Trigger>

          <Menu.Content>
            <ProfileModel user={user}>
              <Menu.Item value="profile" closeOnSelect={false}>
                My profile
              </Menu.Item>
            </ProfileModel>

            <Menu.Separator />
            <Menu.Item value="logout">Logout</Menu.Item>
          </Menu.Content>
        </Menu.Root>
      </Box>
    </Box>
  );
};

export default SideDrawer;
