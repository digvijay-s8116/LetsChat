import { Button, IconButton, Dialog, Image, Text } from "@chakra-ui/react";
import { Eye } from "lucide-react";
import React from "react";

const ProfileModel = ({ user, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children ? (
          children
        ) : (
          <IconButton
            display={{ base: "flex" }}
            variant="ghost"
            aria-label="View Profile"
          >
            <Eye />
          </IconButton>
        )}
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header display="flex" justifyContent="center">
            <Dialog.Title fontSize="40px" fontFamily="Work sans">
              {user?.name}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.CloseTrigger />

          <Dialog.Body
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user?.pic}
              alt={user?.name}
              mb={4}
            />

            <Text
              fontSize={{ base: "24px", md: "28px" }}
              fontFamily="Work sans"
            >
              {user?.email}
            </Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <Button colorPalette="blue" mr={3}>
                Close
              </Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ProfileModel;
