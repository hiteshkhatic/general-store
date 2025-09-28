const db = require("../config/db.js")
const express = require("express")
const router = express.Router()

router.post("/create", async (req, res) => {
  const {
    itemid,
    supplierid,
    quantity,
    purchased_price,
    purchasing_date,
    when_purchased_mnf_date,
    expiry_date,
  } = req.body
  try {
    const { rows } = await db.query(
      "INSERT INTO purchase (item_id, supplier_id, qty, price, date, mnf_date, expiry) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *;",
      [
        itemid,
        supplierid,
        quantity,
        purchased_price,
        purchasing_date,
        when_purchased_mnf_date,
        expiry_date,
      ]
    )
    if (
      !itemid ||
      !supplierid ||
      !quantity ||
      !purchased_price ||
      !purchasing_date ||
      !when_purchased_mnf_date ||
      !expiry_date
    ) {
      return res.status(404).json("Unable to insert Empty fields!")
    }
    res.status(200).json(rows[0])
  } catch (error) {
    console.error("Unable to create purchase: ", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

router.get("/readall", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM purchase;")
    if (rows.length === 0) {
      return res.status(400).json("No records found!")
    }
    res.status(200).json(rows)
  } catch (error) {
    console.error("cannot get all purchases!", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query(
      "SELECT * FROM purchase WHERE (purchase_id) = ($1);",
      [id]
    )
    if (!rows) {
      return res.status(404).json("No records found for this Purchase!")
    }
    return res.status(200).json(rows[0])
  } catch (error) {
    console.error("Unable to found!", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router
