import { MongoClient } from "mongodb"


const mongoClient = new MongoClient(process.env.MONGO_URI)
export const db = mongoClient('8styles')