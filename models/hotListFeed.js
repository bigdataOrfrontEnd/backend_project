const mongoose = require("mongoose");
const Db = require("../db");
// 定义数据结构的模式
const hotListFeedSchema = new mongoose.Schema({
  //   type: String,
  //   style_type: String,
  //   id: String,
  //   card_id: String,
  //   target: {
  //     id: Number,
  //     title: String,
  //     url: String,
  //     type: String,
  //     created: Number,
  //     answer_count: Number,
  //     follower_count: Number,
  //     author: {
  //       type: String,
  //       user_type: String,
  //       id: String,
  //       url_token: String,
  //       url: String,
  //       name: String,
  //       headline: String,
  //       avatar_url: String,
  //     },
  //     bound_topic_ids: [Number],
  //     comment_count: Number,
  //     is_following: Boolean,
  //     excerpt: String,
  //   },
  attached_info: String,
  //   detail_text: String,
  //   trend: Number,
  //   debut: Boolean,
  //   children: [
  //     {
  //       type: String,
  //       thumbnail: String,
  //     },
  //   ],
});

// 使用模式创建模型
const HotListFeedModel = mongoose.model("HotListFeed", hotListFeedSchema);

// 导出模型以在其他文件中使用
module.exports = new Db(HotListFeedModel);
