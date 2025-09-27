const db = require("../config/db.js")
const express = require("express")
const router = express.Router()

router.get("/readall", async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM item;")
    res.status(200).json(rows)
  } catch (error) {
    console.error("Error occured file fetching")
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
