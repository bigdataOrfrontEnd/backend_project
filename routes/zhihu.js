const cheerio = require("cheerio");
const express = require("express");
const hot = require("../models/hotListFeed");
const router = express.Router();
// 引入插件
const charset = require("superagent-charset");
const superagent = require("superagent");
charset(superagent);

// 登陆接口
router.get("/zhihu", async (req, res) => {
  const data = await fetchHTML();
  await hot.insertOne(JSON.parse(data).data[0]);
  res.json({
    ok: 1,
    data: JSON.parse(data).data[0],
  });
});
//向需要爬虫的地方发送axios请求
async function fetchHTML() {
  return new Promise((resolve, reject) => {
    superagent
      .get(
        "https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=50&desktop=true"
      )
      .charset()
      .end(async (err, sres) => {
        if (err) {
          reject(err);
        } else {
          resolve(sres.text);
        }
      });
  });
}

module.exports = router;
