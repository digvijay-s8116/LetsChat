const express = require("express");
const router = express.Router();

const userController = require("./userController");

router.post("/register", userController.userRegister);
router.get("/login", userController.userLogin);

module.exports = router;
