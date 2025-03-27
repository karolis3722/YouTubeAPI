const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/tasksDB");

const TaskSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "pending" },
});
const Task = mongoose.model("Task", TaskSchema);

app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  const task = new Task({ title });
  await task.save();
  res.status(201).json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    await Task.deleteOne({_id: id});
    res.status(201).json(id);
});

app.put("/tasks/:id", async (req, res) => {
    const id = req.params.id;
    await Task.findByIdAndUpdate({_id: id}, {status: "Done"});
    const updatedTask = await Task.findById({_id: id});
    res.status(201).json(updatedTask);
});

app.get("/facts", async (req, res) => {
    const getFacts = await fetch("https://catfact.ninja/facts");
    const facts = await getFacts.json();
    res.status(201).json(facts.data);
  });

app.listen(9000, () => console.log("Server running on port 9000"));
