const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (email, password_hash) VALUES (?, ?)";
  const params = [email, passwordHash];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err);
      if (err.code === "SQLITE_CONSTRAINT") {
        return res.status(400).json({ error: "Email already exists" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(201).json({ id: this.lastID, email });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.get(sql, [email], (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  });
});

module.exports = router;
