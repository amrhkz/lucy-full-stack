const express = require("express");
const { getBanks, createBank, updateBank, deleteBank } = require("../controllers/bankController");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getBanks);
router.post("/", createBank);
router.put("/:id", updateBank);
router.delete("/:id", deleteBank);





module.exports = router;