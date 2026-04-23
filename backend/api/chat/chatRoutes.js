const express = require("express");
const router = express.Router();
const { protect } = require("../../middleware/authMiddleware");
const chatController = require("./chatController");

// to protect all the routes
router.use(protect);
router.post("/", chatController.ascessChat);
router.get("/", chatController.fetchChat);
router.post("/group", chatController.createGroupChat);
router.put("/rename", chatController.renameGroup);
router.put("/groupadd", chatController.addToGroup);
router.put("/groupremove", chatController.removeFromGroup);

module.exports = router;
