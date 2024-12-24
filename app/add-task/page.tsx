"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "../apiService"; // Ajustez le chemin d'import si nécessaire
import { Task } from "../models/task"; // Assurez-vous que le chemin est correct

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [status, setStatus] = useState("pending"); // Statut par défaut
  const router = useRouter();

  const handleAddTask = async () => {
    if (!title) {
      alert("Please provide a title for the task.");
      return;
    }

    const newTask: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
      title,
      description,
      status,
    };

    try {
      // Appel du service pour créer une tâche
      const createdTask = await createTask(newTask as Task);
      console.log("Task created:", createdTask);

      alert("Task successfully created!");
      router.push("/"); // Redirige vers la page principale
    } catch (error) {
      console.error("Error creating task:", error);
      alert("An error occurred while creating the task.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Add New Task</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
        className="flex flex-col gap-6"
      >
        {/* Titre */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description (optional)
          </label>
          <textarea
            placeholder="Enter task description"
            value={description || ""}
            onChange={(e) => setDescription(e.target.value || null)}
            className="p-3 border border-gray-300 rounded-md w-full"
          />
        </div>

        {/* Statut */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 w-full sm:w-auto"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
