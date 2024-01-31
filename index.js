require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Contact = require('./models/contact')


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))


const unknownEndPoint = (req, res , next) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  next(error)
}

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
    Contact.find({}).then(
      contacts => res.json(contacts)
    )
})
//Mostramos un contacto en específico con el id
app.get('/persons/:id', (req, res, next) => {
  let id = req.params.id;
  Contact.findById(id).then(
    result => res.json(result)
  ).catch(
    err => next(err)
  )
})

app.delete('/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id).then(
    res.status(204).end()
  ).catch(error => next(error))
})

//Añadir contactos
app.post('/persons', (req, res, next) => {
  const newContact = req.body

  if (!newContact) {
    return res.status(400).json(
      {
        error: 'content missing'
      }
    )
  }

  const contact = new Contact({
    name : newContact.name,
    number: newContact.number
  })

  contact.save().then(
    savedContact => savedContact.toJSON()
  )
  .then(
    savedContactFormated => res.json(savedContactFormated)
  ).catch(
    error => next(error)
  )

})

//Actualizacion de un contacto existente
app.put('/persons/:id', (req, res, next) => {
  const updateOps = req.body;
  const contact = {
    name: updateOps.name,
    number: updateOps.number
  }
  Contact.findByIdAndUpdate(updateOps.id, contact, {new: true}).then(
    updatedContact => {
      res.json(updatedContact)
    }
  ).catch(
    error => next(error)
  )
}
)
app.use(unknownEndPoint)
//middleware para errores
app.use(errorHandler)


//Configuracion del puerto
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
