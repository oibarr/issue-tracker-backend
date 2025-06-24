const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../db");
const authenticateToken = require("../middleware/auth");

router.use(authenticateToken);

router.get("/", (req, res) => {
  const projectId = req.params.projectId;

  const sql = "SELECT * FROM projects WHERE id = ? AND user_id = ?";

  db.get(sql, [projectId, req.user.sub], (err, project) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!project) {
      console.warn(
        `Access denied: user ${req.user.sub} tried to access project ${projectId}`
      );
      return res.status(404).json({ error: "Project not found" });
    }

    const sqlIssues = "SELECT * FROM issues WHERE project_id = ?";
    db.all(sqlIssues, [projectId], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.json(rows);
    });
  });
});

router.post("/", (req, res) => {
  const projectId = req.params.projectId;
  const { title } = req.body;

  if (!projectId || !title) {
    return res.status(400).json({ error: "Project ID and title are required" });
  }

  const sql = "SELECT * FROM projects WHERE id = ? AND user_id = ?";
  db.get(sql, [projectId, req.user.sub], (err, project) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!project) {
      console.warn(
        `Access denied: user ${req.user.sub} tried to access project ${projectId}`
      );
      return res.status(404).json({ error: "Project not found" });
    }

    const insertSql = "INSERT INTO issues (title, project_id) VALUES (?, ?)";
    db.run(insertSql, [title, projectId], function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      res.status(201).json({ id: this.lastID, title, status: "open" });
    });
  });
});

module.exports = router;
