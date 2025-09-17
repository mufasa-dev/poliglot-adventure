import { MongoClient, Db } from "mongodb";

const uri = import.meta.env.MONGO_URI;
if (!uri) {
  throw new Error("⚠️ MONGO_URI não está configurado no .env");
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db("poliglot_adventure"); // nome do banco
  }

  if (!db) {
    throw new Error("⚠️ Falha ao conectar ao banco de dados");
  }

  return { db, client };
}
