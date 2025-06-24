require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const issueRoutes = require("./routes/issues");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/projects/:projectId/issues", issueRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`backend-express: server running on port ${PORT}`);
});
