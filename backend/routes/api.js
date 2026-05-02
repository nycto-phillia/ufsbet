const express = require("express");
const router = express.Router();

const {
  test,
  receiveData
} = require("../controllers/apiController");

router.get("/test", test);
router.post("/data", receiveData);

module.exports = router;