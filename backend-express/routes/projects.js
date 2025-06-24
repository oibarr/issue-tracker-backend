const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");
const verifyProjectOwnership = require("../middleware/projects");

router.use(authenticateToken);

router.get("/", (req, res) => {
  const sql = "SELECT * FROM projects WHERE user_id = ?";
  const params = [req.user.sub];

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(rows);
  });
});

router.get("/:projectId", verifyProjectOwnership, (req, res) => {
  res.json(req.project);
});

router.post("/", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Project name is required" });
  }

  const sql = "INSERT INTO projects (name, user_id) VALUES (?, ?)";
  const params = [name, req.user.sub];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(201).json({ id: this.lastID, name });
  });
});

module.exports = router;
