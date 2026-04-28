const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, 'frontend')))

let users = []
let nextId = 1

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'))
})

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.post('/api/users', (req, res) => {
  const { name, email } = req.body
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }
  if (users.some(u => u.email === email)) {
    return res.status(409).json({ error: 'Email already exists' })
  }
  const user = { id: nextId++, name, email }
  users.push(user)
  res.status(201).json(user)
})

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  const { name, email } = req.body
  if (name) user.name = name
  if (email) user.email = email
  res.json(user)
})

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return res.status(404).json({ error: 'User not found' })
  users.splice(index, 1)
  res.status(204).send()
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
