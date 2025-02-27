const express = require("express");
const router = express.Router();
const Url = require("../models/Url");
const shortid = require("shortid");

// Shorten a URL
router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "⚠️ URL is required" });
  }

  const shortId = shortid.generate();
  const newUrl = new Url({ originalUrl, shortId });

  await newUrl.save();
  res.json({ shortUrl: `http://localhost:5000/${shortId}` });
});

// Redirect to Original URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  const urlData = await Url.findOne({ shortId });

  if (urlData) {
    return res.redirect(urlData.originalUrl);
  } else {
    return res.status(404).json({ error: "⚠️ URL not found" });
  }
});

module.exports = router;
