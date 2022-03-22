const { body, validationResult } = require("express-validator");
const Author = require("../models/author");

function getAuthors(req, res) {
  Author.find((error, authors_list) => {
    if (error) {
      res.json(error);
    } else {
      res.json(authors_list);
    }
  });
}

function dateFormatter(date) {
  let [day, month, year] = date.split("/");
  return new Date(`${month}/${day}/${year}`).toISOString();
}
const addAuthor = [
  body("first_name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Min should be 3 and Max length to be 100"),
  body("last_name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Min should be 3 and Max length to be 100"),
  body("dob")
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("DOB must be a Date and its format is DD/MM/YYYY"),
  body("dod")
    .isDate({ format: "DD/MM/YYYY" })
    .withMessage("DOD must be a Date and its format is DD/MM/YYYY"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      let { first_name, last_name, dob, dod } = req.body;
      try {
        dob = new Date(dateFormatter(dob)).toISOString();
        dod = new Date(dateFormatter(dod)).toISOString();
      } catch {
        res.json({
          message: "Date format is invaid. Correct format is dd/mm/yyyy",
        });
      }
      let authorObj = new Author({
        first_name,
        last_name,
        dob,
        dod,
      });
      authorObj.save((error) => {
        if (error) {
          res.json(error);
        } else {
          res.json({ status: "Author added successfully" });
        }
      });
    }
  },
];

function deleteAuthor(req, res) {
  Author.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ status: `Author with id ${req.params.id} is deleted` });
    }
  });
}
module.exports = {
  getAuthors,
  addAuthor,
  deleteAuthor,
};
