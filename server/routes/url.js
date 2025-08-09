const express = require("express");

const router = express.Router();
const {handleGenerateShortId,handleShortIdCLick,handleAnalytics} = require("../controllers/url");
router.post("/",handleGenerateShortId);

router.get("/:shortId",handleShortIdCLick);
router.get("/analytics/:shortId",handleAnalytics);
module.exports = router;