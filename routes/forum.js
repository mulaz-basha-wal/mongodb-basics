var express = require("express");
var router = express.Router();
var forumController = require("../controller/forum");

router.get("/", forumController.getForums);
router.post("/", forumController.addForum);
router.put("/:id", forumController.updateForum);
router.delete("/:id", forumController.deleteForum);
module.exports = router;
