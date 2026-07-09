"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

 useEffect(() => {
    async function fetchTasks() {
      const response = await fetch("/api/tasks");
      if (!response) return;

      const data = await response.json();
      setTasks(data.taskList);
    }
    fetchTasks();
  }, [router]);

  return { tasks, setTasks };
}