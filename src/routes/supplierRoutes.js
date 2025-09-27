const db = require("../config/db.js")
const express = require("express")
const router = express.Router()

router.get("/readall", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM supplier;")
    res.status(200).json(rows)
  } catch (error) {
    console.error("Fecthing fails!", error)
    return res.status(500).json({ error: "Server Error" })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query(
      "SELECT * FROM supplier WHERE supplier_id = $1;",
      [id]
    )
    if (rows.length === 0) {
        return res.status(404).json("No data found");
    }
    res.status(200).json(rows[0])

  } catch (error) {
    console.error("Error while fetching recored!", error)
    return res.status(500).json({ error: "Server Error" })
  }
})

router.post("/create", async (req, res) => {
  const { supplier_name, contact, address } = req.body
  try {
    if (!supplier_name || !address) {
      return res.status(400).json("Empty files are not required")
    }
    const { rows } = await db.query(
      "INSERT INTO supplier (supplier_name, contact, address) VALUES ($1 , $2, $3) RETURNING *;",
      [supplier_name, contact, address]
    )
    return res.status(200).json(rows[0])
  } catch (error) {
    console.error("Error creating user!", error)
    return res.status(500).json({ error: "Server Error" })
  }
})
module.exports = router
