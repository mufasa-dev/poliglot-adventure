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