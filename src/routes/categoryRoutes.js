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

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ error: "Category name required to update" })
  }
  try {
    const { rows } = await db.query(
      "UPDATE category SET category_name = $1 WHERE category_id = $2 RETURNING *; ",
      [name, id]
    )
    if (rows.length === 0) {
      return res.status(404).json({ error: "Category not found" })
    }
    res.status(200).json(rows[0])
  } catch (error) {
    console.error("Error updating category: ", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.delete('/:id', async (req,res) => {
  const { id } = req.params;
  try {
    const { rowCount } = await db.query("DELETE FROM category WHERE category_id = $1;", [id]);
    if (rowCount === 0) {
      return res.status(404).json({error: "Category not found"});
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category', error);
    res.status(500).json({error: "Internal Server error"});
  }
})
module.exports = router
