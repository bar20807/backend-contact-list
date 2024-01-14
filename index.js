const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


const db = {
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "046-32145665",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323533",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  }

//En la ruta raiz, mandamos nada mas el db 
app.get('/persons', (req, res) => {
    res.json(db.persons)
})

//Configuracion del puerto
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
