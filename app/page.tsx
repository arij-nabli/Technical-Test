"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "./apiService"; // Assurez-vous que le chemin est correct
import { Task } from "./models/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handle task deletion
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id.toString());
        // Update the task list after deletion
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        alert("Task deleted successfully!");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("An error occurred while deleting the task.");
      }
    }
  };

  // Function to format the date in a readable way (e.g., dd/mm/yyyy)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Jan is 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-8">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Task List</h2>

      {/* Link to Add Task page */}
      <div className="flex justify-end mb-4">
        <Link href="/add-task">
          <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 w-full sm:w-auto">
            Add Task
          </button>
        </Link>
      </div>

      {/* Task table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3">ID</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Description</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Created At</th> {/* Nouvelle colonne pour la date */}
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="odd:bg-white even:bg-gray-50">
                <td className="border p-3">{task.id}</td>
                <td className="border p-3">{task.title}</td>
                <td className="border p-3">{task.description}</td>
                <td className="border p-3">{task.status}</td>
                <td className="border p-3">{formatDate(task.createdAt)}</td> {/* Affichage de la date */}
                <td className="border p-3">
                  {/* Delete Button */}
                  <button
                    className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2 w-full sm:w-auto"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>

                  {/* Modify Button */}
                  <Link href={`/${task.id}`}>
                    <button className="py-1 px-3 bg-green-500 text-white rounded-md hover:bg-green-600 w-full sm:w-auto">
                      Modify
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
