const express = require("express")
const router = express.Router()
const db = require("../config/db.js")

router.get("/readall", async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM category;")
    res.status(200).json(rows)
  } catch (error) {
    console.error("Error while fetching")
    res.status(500).json({ error: "Internal server error" })
  }
})

router.post("/create", async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: "Category name is required." })
  }
  try {
    const { rows } = await db.query(
      "INSERT INTO category (category_name) VALUES ($1) RETURNING *;",
      [name]
    )
    res.status(201).json(rows[0])
  } catch (error) {
    console.error("Error creating category:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router