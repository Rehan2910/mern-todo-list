// REST API routes for tasks (A4, A5), mounted at /api/tasks
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks : fetch all tasks (newest first)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /api/tasks : add a new task
router.post("/", async (req, res) => {
  try {
    // A5: convert to string, trim, reject empty titles
    const title = String(req.body.title ?? "").trim();
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = await Task.create({ title });
    res.status(201).json(task);              // 201 Created
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /api/tasks/:id : edit the title and/or toggle completed
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updates = {};
    if (req.body.title !== undefined) {
      const title = String(req.body.title).trim();   // A5
      if (!title) return res.status(400).json({ error: "Title cannot be empty" });
      updates.title = title;
    }
    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id : remove a task
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
