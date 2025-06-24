const db = require("../db");

function verifyProjectOwnership(req, res, next) {
  const projectId = req.params.projectId;
  const userId = req.user.sub;

  const sql = "SELECT * FROM projects WHERE id = ? AND user_id = ?";

  db.get(sql, [projectId, userId], (err, project) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!project) {
      console.warn(
        `Access denied: user ${userId} tried to access project ${projectId}`
      );

      return res.status(404).json({ error: "Project not found" });
    }

    req.project = project;
    next();
  });
}

module.exports = verifyProjectOwnership;
