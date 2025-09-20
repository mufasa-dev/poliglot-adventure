import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db";

export interface Course {
  _id?: ObjectId;
  userId: string;
  name: string;
  createdAt: Date;
}

export async function createCourse(course: Course) {
  const { db } = await connectToDatabase();
  const courses = db.collection<Course>("courses");
  return await courses.insertOne(course);
}

export async function findCoursesByUser(userId: string) {
  const { db } = await connectToDatabase();
  const courses = db.collection<Course>("courses");
  return await courses.find({ userId }).toArray();
}
