const BACKEND_URL = 'http://localhost:3001';  // URL de base du backend

// Importer le type Task
import { Task } from './models/task'; // Assurez-vous que le chemin vers le fichier est correct

// Fonction générique pour effectuer les appels fetch
async function fetchData<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Erreur HTTP : ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Erreur lors de la requête API:', error);
    throw error;  // Relance l'erreur pour être gérée par l'appelant
  }
}

// Récupérer toutes les tâches
export async function getTasks(): Promise<Task[]> {
  return fetchData<Task[]>(`${BACKEND_URL}/tasks`, { cache: 'no-store' });
}

// Récupérer une tâche par son ID
export async function getTask(id: string): Promise<Task> {
  return fetchData<Task>(`${BACKEND_URL}/tasks/${id}`, { cache: 'no-store' });
}

// Créer une nouvelle tâche
export async function createTask(task: Task): Promise<Task> {
  return fetchData<Task>(`${BACKEND_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
}

// Mettre à jour une tâche
export async function updateTask(id: string, updatedTask: Task): Promise<Task> {
  return fetchData<Task>(`${BACKEND_URL}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTask),
  });
}

// Supprimer une tâche
export async function deleteTask(id: string): Promise<void> {
  return fetchData<void>(`${BACKEND_URL}/tasks/${id}`, {
    method: 'DELETE',
  });
}
