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

module.exports = router
