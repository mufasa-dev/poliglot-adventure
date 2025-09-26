import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db";

export interface Lesson {
  _id?: ObjectId;
  title: string;
  description: string;
  content: any[];
  courseId: string;
  userId: string;
  createdAt: Date;
}

export async function createLesson(lesson: Lesson) {
  const { db } = await connectToDatabase();
  const lessons = db.collection<Lesson>("lessons");
  return await lessons.insertOne(lesson);
}

export async function findLessonsByUser(userId: string) {
  const { db } = await connectToDatabase();
  const lessons = db.collection<Lesson>("lessons");
  return await lessons.find({ userId }).toArray();
}

export async function findLessonsByCourse(courseId: string) {
  const { db } = await connectToDatabase();
  const lessons = db.collection<Lesson>("lessons");
  return await lessons.find({ courseId }).toArray();
}

export async function findLessonById(id: string) {
  const { db } = await connectToDatabase();
  const lessons = db.collection<Lesson>("lessons");
  return await lessons.findOne({ _id: new ObjectId(id) });
}

export async function updateLesson(id: string, data: Partial<Lesson>) {
  const { db } = await connectToDatabase();
  const lessons = db.collection<Lesson>("lessons");
  return await lessons.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

export async function deleteLesson(id: string) {
  const { db } = await connectToDatabase();
  const lessons = db.collection<Lesson>("lessons");
  return await lessons.deleteOne({ _id: new ObjectId(id) });
}
