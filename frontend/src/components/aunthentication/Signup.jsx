import { Input, VStack, Field, InputGroup, Button } from "@chakra-ui/react";
import { toaster } from "../ui/toaster";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// console.log("ASdfsdfsadf", BASE_URL);

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();

  // this is used to create a loading at the time of image upload  in the signup button
  const [loading, setLoading] = useState(false);

  async function postDetails(pic) {
    setLoading(true);
    if (pic === undefined) {
      toaster.create({
        title: "Image missing",
        description: "Please upload a profile picture",
        type: "warning",
        duration: 3000,
      });
      return;
    }

    //  Here is the cloudanary code to upload picture and get url
    const data = new FormData();
    if (pic.type === "image/jpeg" || pic.type == "image/png") {
      setLoading(true);

      data.append("file", pic);
      data.append("upload_preset", "Lets_Chat");
      data.append("cloud_name", "digvijaysingh");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/digvijaysingh/image/upload",
          data,
        );

        setPic(res.data.secure_url);
        setLoading(false);
        // console.log(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    } else {
      toaster.create({
        title: "Select Image",
        description: "Please upload a profile picture",
        type: "warning",
        duration: 3000,
      });

      setLoading(false);
    }
  }

  async function submitHandler() {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      console.log("here");
      toaster.create({
        title: "Please fill all the fields",
        type: "warning",
        duration: 3000,
      });

      setLoading(false);
      return;
    }

    if (password !== confirmpassword) {
      toaster.create({
        title: "password and confirm password did not matched",
        type: "warning",
        duration: 3000,
      });
      setLoading(false);
      return;
    }

    try {
      let data = {
        name,
        email,
        password,
        confirmpassword,
      };

      // give a config
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response = await axios.post(
        `${BASE_URL}/api/user/register`,
        data,
        config,
      );

      // This ONLY runs if the backend sends a 200 Success status
      console.log(response.data.response);
      toaster.create({
        title: "Registration successfully",
        type: "success",
        duration: 3000,
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data.response));

      setLoading(false);

      navigate("/chats");
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data.responseMessage) {
        toaster.create({
          title: error.response.data.responseMessage,
          type: "warning",
          duration: 3000,
        });
        setLoading(false);
      } else {
        console.log("Network Error:", error.message);
        toaster.create({
          title: "Something went wrong. Please try again.",
          type: "error",
          duration: 3000,
        });
        setLoading(false);
      }
    }
  }

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
            type={show2 ? "text" : "password"}
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
        loading={loading} //  isloading is old way use loading
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
