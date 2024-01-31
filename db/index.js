const { db } = require("../configs");
const mongoose = require("mongoose");
async function connect() {
  try {
    if (mongoose.connection.readyState === 1) return;
    return mongoose.connect(`mongodb://${db.address}:${db.port}/${db.dbname}`, {
      serverSelectionTimeoutMS: 1000,
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
}
module.exports = class Db {
  constructor(model) {
    this.model = model;
  }
  // 插入一条数据
  async insertOne(insertObj) {
    console.log(insertObj);
    await connect();
    return this.model(insertObj).save();
  }
  async find(options = {}) {
    const { whereObj = {}, sortObj = {}, skip = 0, limit = 0 } = options;
    await connect();
    return this.model.find(whereObj).sort(sortObj).skip(skip).limit(limit);
  }
  async findById(id) {
    await connect();
    return this.model.findById(id);
  }
  async count(whereObj = {}) {
    await connect();
    return this.model.count(whereObj);
  }
  async deleteOneById(_id) {
    await connect();
    return this.model.deleteOne({ _id });
  }
  async updateOneById(_id, upObj) {
    await connect();
    return this.model.updateOne({ _id }, upObj);
  }
  async updateOne(whereObj, upObj) {
    await connect();
    return this.model.updateOne(whereObj, upObj);
  }
};
