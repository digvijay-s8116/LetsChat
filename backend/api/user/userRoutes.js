const express = require("express");
const router = express.Router();

const userController = require("./userController");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);
router.get("/",userController.allUsers)

module.exports = router;
