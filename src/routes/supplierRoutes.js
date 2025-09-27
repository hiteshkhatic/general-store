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

module.exports = router
