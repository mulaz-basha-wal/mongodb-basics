const { body, validationResult } = require("express-validator");
const Forum = require("../models/forum");

function getForums(req, res) {
  Forum.find((error, forum_list) => {
    if (error) {
      res.json(error);
    } else {
      res.json(forum_list);
    }
  });
}

function dateFormatter(date) {
  let [day, month, year] = date.split("/");
  return new Date(`${month}/${day}/${year}`).toISOString();
}
const addForum = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Min should be 10 and Max length to be 100"),
  body("forumBody")
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage("Min should be 50 and Max length to be 500"),
  body("author")
    .isLength({ min: 5, max: 50 })
    .withMessage("Min should be 5 and Max length to be 50")
    .isAlphanumeric()
    .withMessage("Author is only alphanumeric"),
  body("doc")
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("DOD must be a Date and its format is DD/MM/YYYY"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { title, forumBody, author, doc } = req.body;
      try {
        doc = new Date(dateFormatter(doc)).toISOString();
      } catch {
        res.json({
          message: "Date format is invaid. Correct format is DD/MM/YYYY",
        });
      }
      let forumObj = new Forum({
        title,
        forumBody,
        author,
        doc,
      });
      forumObj.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: "Forum added successfully" });
        }
      });
    }
  },
];

function deleteForum(req, res) {
  Forum.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ status: `Forum with id ${req.params.id} is deleted` });
    }
  });
}

const updateForum = [
  body("title")
    .trim()
    .isLength({ min: 10, max: 100 })
    .withMessage("Min should be 10 and Max length to be 100"),
  body("forumBody")
    .trim()
    .isLength({ min: 50, max: 500 })
    .withMessage("Min should be 50 and Max length to be 500"),
  body("author")
    .isLength({ min: 5, max: 50 })
    .withMessage("Min should be 5 and Max length to be 50")
    .isAlphanumeric()
    .withMessage("Author is only alphanumeric"),
  body("doc")
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("DOD must be a Date and its format is DD/MM/YYYY"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { title, forumBody, author, doc } = req.body;
      try {
        doc = new Date(dateFormatter(doc)).toISOString();
      } catch {
        res.json({
          message: "Date format is invaid. Correct format is DD/MM/YYYY",
        });
      }
      let forumObj = {
        title,
        forumBody,
        author,
        doc,
      };
      Forum.findByIdAndUpdate({ _id: req.params.id }, forumObj, function (err) {
        if (err) {
          res.json({ from: "Error from mongoose", error });
        } else {
          res.json({ message: `field updated successfully` });
        }
      });
    }
  },
];

module.exports = {
  getForums,
  addForum,
  deleteForum,
  updateForum,
};
