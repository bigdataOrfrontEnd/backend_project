const fs = require("node:fs/promises");
const path = require("path");
const express = require("express");
const OpenAI = require("openai");

const formidable = require("formidable");

const advM = require("../models/adv");
const middleware = require("../middleware");
const utils = require("../utils");

const router = express.Router();
const openai = new OpenAI({
  apiKey: "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",
});
// gpt
router.get("/gpt", async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  console.log("111");
  res.sendJson("添加成功", 1);
});
module.exports = router;
