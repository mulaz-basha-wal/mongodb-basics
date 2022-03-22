var express = require("express");
var router = express.Router();
var authorController = require("../controller/author");

router.get("/", authorController.getAuthors);
router.post("/", authorController.addAuthor);
router.delete("/:id", authorController.deleteAuthor);
module.exports = router;
