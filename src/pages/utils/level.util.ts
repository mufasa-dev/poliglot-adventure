type Level =
  | "Iniciante" | "Básico" | "Intermediário" | "Avançado" | "Fluente"
  | "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
  | "JLPT N5" | "JLPT N4" | "JLPT N3" | "JLPT N2" | "JLPT N1"
  | "HSK1" | "HSK2" | "HSK3" | "HSK4" | "HSK5" | "HSK6" | "HSK7" | "HSK8" | "HSK9";

interface LevelClasses {
  border: string;
  bg: string;
  text?: string; // opcional
}

export function getLevelClasses(level: Level) {
  switch (level) {
    case "Iniciante":
    case "Básico":
    case "A1":
    case "JLPT N5":
    case "HSK1":
      return { text: "text-green-500", border: "border-green-500 text-green-700", bg: "btn-success", hover: "hover:bg-green-500 hover:text-white" };
    case "Intermediário":
    case "A2":
    case "B1":
    case "JLPT N4":
    case "JLPT N3":
    case "HSK2":
    case "HSK3":
      return { text: "text-yellow-500", border: "border-yellow-500 text-yellow-700", bg: "btn-warning", hover: "hover:bg-yellow-600" };
    case "Avançado":
    case "B2":
    case "JLPT N2":
    case "HSK4":
    case "HSK5":
    case "HSK6":
      return { text: "text-orange-500", border: "border-orange-500", bg: "btn-secondary", hover: "hover:bg-orange-600" };
    case "Fluente":
    case "C1":
    case "C2":
    case "JLPT N1":
    case "HSK7":
    case "HSK8":
    case "HSK9":
      return { text: "text-red-500", border: "border-red-500", bg: "btn-primary", hover: "hover:bg-red-600" };
    default:
      return { text: "text-gray-500", border: "border-gray-500", bg: "btn-success", hover: "hover:bg-gray-600" };
  }
}
