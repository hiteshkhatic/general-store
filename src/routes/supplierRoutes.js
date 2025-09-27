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
module.exports = router
