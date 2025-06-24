const express = require("express");
const router = express.Router({ mergeParams: true });
const db = require("../db");
const authenticateToken = require("../middleware/auth");
const verifyProjectOwnership = require("../middleware/projects");

router.use(authenticateToken);

router.get("/", verifyProjectOwnership, (req, res) => {
  const projectId = req.params.projectId;

  const sql = "SELECT * FROM issues WHERE project_id = ?";
  db.all(sql, [projectId], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(rows);
  });
});

router.post("/", verifyProjectOwnership, (req, res) => {
  const projectId = req.params.projectId;
  const { title } = req.body;

  if (!projectId || !title) {
    return res.status(400).json({ error: "Project ID and title are required" });
  }

  const sql = "INSERT INTO issues (title, project_id) VALUES (?, ?)";
  db.run(sql, [title, projectId], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(201).json({ id: this.lastID, title, status: "open" });
  });
});

module.exports = router;
