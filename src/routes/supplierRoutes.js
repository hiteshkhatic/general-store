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

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { supplier_name, contact, address } = req.body
  try {
    if (!supplier_name || !address) {
      return res.status(404).json("Fields are Empty!")
    }
    const { rows } = await db.query(
      "UPDATE supplier SET supplier_name = $1, contact = $2, address = $3 WHERE supplier_id = $4 RETURNING *;",
      [supplier_name, contact, address, id]
    )
    res.status(200).json(rows[0])
  } catch (error) {
    console.error("Not working !", error)
    return res.status(500).json({ error: "Server Error" })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query(
      "DELETE FROM supplier WHERE supplier_id = $1",
      [id]
    )
    res.status(200).end()
  } catch (error) {
    console.error("Not able to delte!", error)
    return res.status(500).json({ error: "Sever error" })
  }
})
module.exports = router
