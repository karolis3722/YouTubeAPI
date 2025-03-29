import { useState, useEffect } from "react";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    const res = await fetch("http://localhost:9000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const removeTask = async (id) => {
    await fetch(`http://localhost:9000/tasks/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
  }

  const changeTaskStatus = async (id) => {
    const res = await fetch(`http://localhost:9000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const updatedTask = await res.json(); 
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, status: updatedTask.status } : task
      )
    );
  }

  const getCatFacts = async() => {
    await fetch("http://localhost:9000/facts")
    .then((res) => res.json())
    .then((data) => setFacts(data));
  }

  return (
    <div>
      <h1>My tasks</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>
        Add Task
      </button>

      <ul>
        <p>{ JSON.stringify(tasks) }</p>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - <span>{task.status} </span>
            <button onClick={() => changeTaskStatus(task._id)}>Mark as Done</button>
            <span> </span>
            <button onClick={() => removeTask(task._id)}>Remove task</button>
          </li>
        ))}
      </ul>
      
      <button onClick={() => getCatFacts()}>Cat facts</button>
      <ul>
      {facts.map((item) => (
        <li key={item.length}> {item.fact} </li>
      ))}
      </ul>
    </div>
  );
}
