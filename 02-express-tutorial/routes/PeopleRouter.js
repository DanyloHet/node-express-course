const express = require("express");
const router = express.Router();
const {
  getAllPeople,
  getPersonByID,
  addPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/PeopleController");

router.get("/", getAllPeople);
router.get("/:id", getPersonByID);
router.post("/", addPerson);
router.put("/:id", updatePerson);
router.delete("/:id", deletePerson);

module.exports = router;
