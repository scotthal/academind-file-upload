const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  if (!process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD) {
    console.error("Set MONGODB_USERNAME and MONGODB_PASSWORD!");
    process.exit(-1);
  }

  const client = await MongoClient.connect(
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo`
  );
  database = client.db("file-demo");
}

function getDb() {
  if (!database) {
    throw { message: "Database not connected!" };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
