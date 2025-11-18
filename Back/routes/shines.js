const express = require("express");
const router = express.Router();
const { getShine, updateShine, archiveShine } = require("../controllers/shineController");
const authMiddleware = require("../middlewares/auth");

router.use(authMiddleware);

router.get("/", getShine);
router.put("/:id", updateShine);
router.put("/:id/archive", archiveShine);




module.exports = router;