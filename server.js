const express = require('express')

const app = express()
const PORT = 3000

app.use(express.json())

let users = []
let nextId = 1

app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  const user = { id: nextId++, name, email }
  users.push(user)
  res.status(201).json(user)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
