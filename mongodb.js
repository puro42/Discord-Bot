module.exports = {
  async connect(connect_str) {
    const MongoClient = require("mongodb")
    const mongo = new MongoClient(connect_str)
    try{
      await mongo.connect()
    }
    catch{
      console.log("failed to start")
    }
    return mongo
  }
  async get_reports(mongo_client,ID  {
    
  })
}