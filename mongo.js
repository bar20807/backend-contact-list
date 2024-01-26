const mongoose = require('mongoose')

if (process.argv.length !== 5) {
    console.log('Usage: node mongo.js <password> <name> <number>');
    process.exit(1);
}

  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

const url = `mongodb+srv://hvh-fullstack-developer:${password}@contact-list.huw4b3q.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(url)

const Contact = new mongoose.Schema(
    {
        name: String,
        number: String,
    }
)

const Model_contact = mongoose.model('Contact', Contact)

const newContact = new Model_contact({
    name: name,
    number: number
})

newContact.save().then((result) => {
  console.log(`added ${name} number ${number} to phonebook `);
  mongoose.connection.close();
});