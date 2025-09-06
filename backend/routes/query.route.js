const express = require("express");
const {
  createQueryController,
  getQueriesController,
  respondToQueryController,
  deleteQueryController,
  getMyQueriesController
} = require("../controllers/query.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/", auth, createQueryController);
router.get("/", auth, getQueriesController);
router.get("/my", auth, getMyQueriesController);
router.put("/:id/respond", auth, respondToQueryController);
router.delete("/:id", auth, deleteQueryController);

module.exports = router;
