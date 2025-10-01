import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db";

export interface Person {
  _id?: ObjectId;
  name: string; // Nome da pessoa
  description: string; // Quem é a pessoa (ex: vendedor de pizza, namorado, amigo de infância)
  level: string; // Nível da conversa (iniciante, intermediário, avançado)
  objectives: string[]; // Objetivos da conversa (ex: "comprar uma pizza", "se cumprimentar", "pedir informações")
  userId: string; // dono da persona
  courseId?: string; // curso relacionado (opcional)
  createdAt: Date;
}

export async function createPerson(person: Person) {
  const { db } = await connectToDatabase();
  const people = db.collection<Person>("people");
  return await people.insertOne(person);
}

export async function findPeopleByUser(userId: string) {
  const { db } = await connectToDatabase();
  const people = db.collection<Person>("people");
  return await people.find({ userId }).sort({ createdAt: -1 }).toArray();
}

export async function findPeopleByCourse(courseId: string) {
  const { db } = await connectToDatabase();
  const people = db.collection<Person>("people");
  return await people.find({ courseId }).sort({ createdAt: -1 }).toArray();
}

export async function findPersonById(id: string) {
  const { db } = await connectToDatabase();
  const people = db.collection<Person>("people");
  return await people.findOne({ _id: new ObjectId(id) });
}

export async function updatePerson(id: string, data: Partial<Person>) {
  const { db } = await connectToDatabase();
  const people = db.collection<Person>("people");
  return await people.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

export async function deletePerson(id: string) {
  const { db } = await connectToDatabase();
  const people = db.collection<Person>("people");
  return await people.deleteOne({ _id: new ObjectId(id) });
}
