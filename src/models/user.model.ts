import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db";

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  course?: string;
  createdAt: Date;
}

export async function createUser(user: User) {
  const { db } = await connectToDatabase();
  const users = db.collection<User>("users");
  return await users.insertOne(user);
}

export async function findUserByEmail(email: string) {
  const { db } = await connectToDatabase();
  const users = db.collection<User>("users");
  return await users.findOne({ email });
}

export async function updateUserCourse(userId: string, courseName: string) {
  const { db } = await connectToDatabase();
  const users = db.collection<User>("users");

  return await users.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { course: courseName } }
  );
}

export async function findUserById(id: string) {
  const { db } = await connectToDatabase();
  return db.collection("users").findOne({ _id: new ObjectId(id) });
}

export async function updateUserById(id: string, data: any) {
  const { db } = await connectToDatabase();
  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.matchedCount > 0;
}