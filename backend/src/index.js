const express = require("express")
const queries = require("./db")
const app = express()
const corsMiddleware = require("./middlewear/cors.middlewear")

const PORT = 8000

app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/", queries.getAll)
app.post("/", queries.createTodo)
app.post("/rem", queries.removeOne)
app.post("/compl", queries.completed)

app.listen(PORT, () => {
  console.log("server start")
})
