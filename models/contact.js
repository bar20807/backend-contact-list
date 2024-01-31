const mongoose = require('mongoose')
//Evitar que se guarden repetidos desde el backend
//Para ello utilizaremos el mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

//console.log(url)

mongoose.connect(url)
.then(result => console.log('connected to MongoDB'))
.catch(error => console.log('error connecting to MongoDB:', error.message))

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    //Esto permite que se solicite y revise el estado de los datos antes de ser almacenados en la base de datos
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
});

//Y dicho mongoose-unique-validator se le agregará al schema
contactSchema.plugin(uniqueValidator);

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
      }
})




module.exports = mongoose.model('Contact', contactSchema)