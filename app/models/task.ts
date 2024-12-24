// Définir un type pour la tâche (correspond à la classe backend)
export interface Task {
    id: number;
    title: string;
    description: string | null;  // description est nullable dans le backend
    status: string;
    createdAt: string;  // La date est souvent renvoyée sous forme de chaîne (ISO 8601)
    updatedAt: string;
  }
  