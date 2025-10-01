import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db";

// Interface do Exercise
export interface Exercise {
  _id?: ObjectId;
  title: string;               // Título do conjunto de exercícios
  description: string;         // Breve descrição
  courseId: string;            // Referência ao curso
  lessonId: string;            // Referência à lição
  level: string;               // Nível da lição
  userId: string;              // Dono do exercício
  content: ExerciseItem[];     // Lista de exercícios
  createdAt: Date;
  updatedAt?: Date;
}

// Cada item do exercício
export interface ExerciseItem {
  question: string;            // Pergunta
  answers: ExerciseAnswer[];   // Alternativas de múltipla escolha
}

// Cada alternativa
export interface ExerciseAnswer {
  answer: string;              // Texto da alternativa
  correct: boolean;            // Se é a resposta correta
}

// Funções CRUD
export async function createExercise(exercise: Exercise) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.insertOne(exercise);
}

export async function findExercisesByUser(userId: string) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.find({ userId }).toArray();
}

export async function findExerciseByCourse(courseId: string) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.find({ courseId }).sort({ createdAt: -1 }).toArray();
}

export async function findExercisesByLesson(lessonId: string) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.find({ lessonId }).sort({ createdAt: -1 }).toArray();
}

export async function findExerciseById(id: string) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.findOne({ _id: new ObjectId(id) });
}

export async function updateExercise(id: string, data: Partial<Exercise>) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

export async function deleteExercise(id: string) {
  const { db } = await connectToDatabase();
  const exercises = db.collection<Exercise>("exercises");
  return await exercises.deleteOne({ _id: new ObjectId(id) });
}
