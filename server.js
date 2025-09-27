require("dotenv").config()

const express = require("express")
const app = express()
const categoryRoutes = require("./src/routes/categoryRoutes.js")
const itemRoutes = require('./src/routes/itemRoutes.js')

app.use(express.json())
app.use("/category", categoryRoutes)
app.use("/item", itemRoutes)

const PORT = process.env.PORT
app.listen(PORT || 5501, () => console.log(`Server is running on PORT ${PORT}`))
