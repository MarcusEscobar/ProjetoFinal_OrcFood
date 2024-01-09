const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  return res.json({message: "Olá Mundo"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})