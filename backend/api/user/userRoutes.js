const express = require("express");
const router = express.Router();
const {protect} = require("../../middleware/authMiddleware");

const userController = require("./userController");

router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

// use a auth middleware to authenticate the user with the token all the api below this is protected by this middle ware
router.use(protect);
router.get("/", userController.allUsers);

module.exports = router;
