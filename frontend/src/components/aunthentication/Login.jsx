import { Button, Field, Input, InputGroup, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "../ui/toaster";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submitHandler() {
    setLoading(true);

    if (!email || !password) {
      toaster.create({
        title: "Please fill all the fields",
        type: "warning",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      // give a config
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        email,
        password,
      };

      let response = await axios.post(
        `${BASE_URL}/api/user/login`,
        data,
        config,
      );
      toaster.create({
        title: "Login successfully",
        type: "success",
        duration: 3000,
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data.response));
      navigate("/chats");
      console.log(response);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.data) {
        toaster.create({
          title: error.response.data.responseMessage,
          type: "warning",
          duration: 3000,
        });
        console.log("here", error.response.data.responseMessage);
        setLoading(false);
      } else {
        toaster.create({
          title: "Something went wrong try again",
          type: "warning",
          duration: 3000,
        });
        setLoading(false);
        console.log(error.message);
      }
    }
  }

  return (
    <VStack spacing="5px" color="black">
      <Field.Root id="email" required>
        <Field.Label>Email</Field.Label>
        <Input
          placeholder="Enter Your email"
          value = {email}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
      </Field.Root>

      <Button
        colorPalette="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        loading={loading}
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
