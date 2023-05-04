const express = require("express");
const router = express.Router();

const {
  all,
  add,
  remove,
  edit,
  findEmployee,
} = require("../controllers/employees");
const { auth } = require("../middleware/auth");

// /api/employee/
router.get("/", auth, all);
// /api/employee/id
router.get("/:id", auth, findEmployee);
// /api/employee/add
router.post("/add", auth, add);
// /api/employee/remove/id
router.post("/remove/:id", auth, remove);
// /api/employee/edit/id
router.put("/edit/:id", auth, edit);

module.exports = router;
