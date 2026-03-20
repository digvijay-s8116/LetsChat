import { Button, Field, Input, InputGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function submitHandler() {}
  return (
    <VStack spacing="5px" color="black">
      <Field.Root id="email" required>
        <Field.Label>Email</Field.Label>
        <Input
          placeholder="Enter Your email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
      </Field.Root>

      <Field.Root id="password" required>
        <Field.Label>Password</Field.Label>
        <InputGroup
          endElement={
            <Button size="sm" onClick={() => setShow(!show)}>
              {show ? "hide" : "show"}
            </Button>
          }
        >
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </Field.Root>

      <Button
        colorPalette="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign In
      </Button>

      <Button
        variant="solid"
        colorPalette="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("12345678");
        }}
      >
        Login as a Guest User
      </Button>
    </VStack>
  );
};

export default Login;
