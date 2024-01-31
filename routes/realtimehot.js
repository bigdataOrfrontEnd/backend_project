const axios = require("axios");
const https = require("https");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
// 引入插件
const charset = require("superagent-charset");
const superagent = require("superagent");
const { resolve } = require("path");
const { reject } = require("superagent/lib/request-base");
charset(superagent);

// 登陆接口
router.get("/realtimehot", async (req, res) => {
  console.log("开始爬虫");
  //目标地址
  const url = "https://s.weibo.com/top/summary";
  //请求头
  const header = {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Mobile Safari/537.36",
    Host: "s.weibo.com",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    Cookie: "",
  };
  const data = await fetchHTML(url, header);
  res.json({
    ok: 1,
    data: data,
  });
});
//向需要爬虫的地方发送axios请求

async function fetchHTML(r, header) {
  return new Promise((resolve, reject) => {
    superagent
      .get(
        r
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
function extractInformation(html) {
  // 使用cheerio加载页面内容，类似于jQuery
  const $ = cheerio.load(html);
  const content = $("tbody");
  // console.log(content);
}
module.exports = router;
