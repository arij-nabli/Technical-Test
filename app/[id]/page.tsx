"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Make sure to import `useRouter` for navigation
import { getTask, updateTask } from "../apiService"; // Check the path to your API services
import { Task } from "../models/task";

export default function EditTask() {
  const params = useParams(); // Retrieve URL parameters
  const router = useRouter(); // For redirection after submission
  const { id } = params || {}; // Extract the ID from the parameter
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch task data
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const fetchedTask = await getTask(id as string);
          setTask(fetchedTask);
        } catch (error) {
          console.error("Error fetching task:", error);
          setError("Unable to load task.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchTask();
    } else {
      setError("Invalid task ID.");
      setIsLoading(false);
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : null));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      try {
        await updateTask(task.id.toString(), task);
        alert("Task updated successfully!");
        router.push("/"); // Redirect to task list
      } catch (error) {
        console.error("Error updating task:", error);
        alert("An error occurred while updating.");
      }
    }
  };

  // Function to cancel and return to the task list
  const handleCancel = () => {
    router.push("/"); // Redirect to task list without saving
  };

  // Display loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div className="p-8">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Edit Task</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description || ""}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <button
            type="submit"
            className="py-2 px-4 mb-4 sm:mb-0 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 sm:w-auto w-full"
          >
            Save Task
          </button>
          {/* Cancel button */}
          <button
            type="button"
            onClick={handleCancel}
            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 sm:w-auto w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
