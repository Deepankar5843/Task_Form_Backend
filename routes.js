// routes.js

module.exports = function (app, db) {
  // Retrieve all tasks
  app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks", (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  });

  // Add a new task
  app.post("/tasks", (req, res) => {
    const { title, description } = req.body;
    db.run(
      "INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
      [title, description, false],
      (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: "Task added successfully" });
      }
    );
  });

  // Update a task's status
  app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    db.run(
      "UPDATE tasks SET completed = ? WHERE id = ?",
      [completed, id],
      (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: "Task updated successfully" });
      }
    );
  });

  // Delete a task
  app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM tasks WHERE id = ?", id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Task deleted successfully" });
    });
  });
};
