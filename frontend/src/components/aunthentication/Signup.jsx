import { Input, VStack, Field, InputGroup, Button } from "@chakra-ui/react";
import { Toaster, toaster } from "../ui/toaster";

import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const [loading, setLoading] = useState(false);

  function postDetails(pics) {
    setLoading(true);
    if (pic === undefined) {
      toaster.create({
        title: "Image missing",
        description: "Please upload a profile picture",
        type: "warning",
        duration: 3000,
      });
    }
    rr1u7dDTPQEpglXv02srpTDYMOk;
  }

  function submitHandler() {}

  return (
    <VStack spacing="5px" color="black">
      <Field.Root id="firstName" required>
        <Field.Label>Name</Field.Label>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </Field.Root>

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

      <Field.Root id="confirmPassword" required>
        <Field.Label>Confirm Password</Field.Label>
        <InputGroup
          endElement={
            <Button size="sm" onClick={() => setShow2(!show2)}>
              {show2 ? "hide" : "show"}
            </Button>
          }
        >
          <Input
            type={show ? "text" : "ConfirmPassword"}
            placeholder="Enter Your ConfirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </InputGroup>
      </Field.Root>

      <Field.Root>
        <Field.Label>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          ></Input>
        </Field.Label>
      </Field.Root>

      <Button
        colorPalette="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
