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

router.post("/create", async (req,res) => {
    const { name, fid, unit } = req.body;
    try {
        const { rows } = await db.query("INSERT INTO item (item_name, category_id, item_unit) VALUES ($1, $2, $3) RETURNING *;", [name,fid,unit]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Inserting while Error', error);
        res.status(500).json({ error: "Server Error"});
    }
})

router.get("/:id", async (req,res) => {
    const{ id } = req.params;
    try {
            const {rows} = await db.query("SELECT * FROM item WHERE (item_id) = ($1);", [id]);
            if (rows.length === 0) {
                res.status(404).json("No data found");
            }
            return res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Not able to find your data dear !", error);
        return res.status(500).json("Server error");
    }
})
module.exports = router
