const path = require("path");
const express = require("express");
const configs = require("./configs");
const middleware = require("./middleware");
const Cookies = require("cookies");
const adminRouter = require("./routes/admin");
const advRouter = require("./routes/adv");
const loginRouter = require("./routes/login");
const realtimehot = require("./routes/realtimehot");
const zhihuhot = require("./routes/zhihu");

const app = express();

app.use(express.static(path.resolve(__dirname, "upload")));
app.use(middleware.sendJson());
app.use(express.json()); // 将请求体中的数据放置到req.body中

// 设置全局响应头---主要用来进行跨域请求的设置
// app.use((req, res, next) => {
//   const val = configs["Access-Control-Allow-Origin"];

//   if (typeof val === "string") {
//     res.set("Access-Control-Allow-Origin", val);
//   } else if (val instanceof Array) {
//     const origin = req.headers.origin;
//     if (val.includes(origin)) {
//       res.set("Access-Control-Allow-Origin", origin);
//     }
//   }
//   next();
// });
// 设置cookie
//这个中间件可以用于在每个请求中检查用户是否已经登录，并且如果登录了，
//可以获取用户的详细信息并添加到请求对象中，方便后续路由处理程序使用。
app.use(async function (req, res, next) {
  req.cookies = new Cookies(req, res);
  console.log(req.cookies);

  // 解析登录用户的cookies信息
  if (req.cookies.get("userInfo")) {
    try {
      console.log(req.cookies);
      // req.userInfo = JSON.parse(req.cookies.get("userInfo"));
      // const userInfo = await User.findById(req.userInfo._id);
      // req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
    } catch (e) {
      console.log(e);
    }
  }
  next();
});
// 挂载路由
app.use(adminRouter);
app.use(advRouter);
app.use(loginRouter);
app.use(realtimehot);
app.use(zhihuhot);
//加载静态资源
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("*", (req, res) => {
  // res.status(404).sendJson("资源不存在", -1);
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(configs.port, configs.bindIp, () => {
  console.log(`http server is running on ${configs.bindIp}:${configs.port}`);
});
