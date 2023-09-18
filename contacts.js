const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (!err) {
      const rawData = data.toString();
      const contact = JSON.parse(rawData);
      console.log(contact);
      return;
    }
  });
}
function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (!err) {
      const rawData = data.toString();
      const contacts = JSON.parse(rawData);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index !== -1) {
        console.log(index, "WYSZUKIWANY INDEX");
      } else {
        console.log(`Nie znaleziono kontaktu o ID ${contactId}`);
      }
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (!err) {
      const rawData = data.toString();
      const contacts = JSON.parse(rawData);
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index !== -1) {
        contacts.splice(index, 1);

        fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
          if (err) {
            console.error("Error writing contacts file:", err);
            return;
          }

          console.log(`Kontakt o ID ${contactId} został usunięty.`);
        });
      } else {
        console.log(`Nie znaleziono kontaktu o ID ${contactId}.`);
      }
    }
  });
}

function addContact(name, email, phone) {
  const generateID = shortid.generate();
  fs.readFile(contactsPath, (err, data) => {
    if (!err) {
      const rawData = data.toString();
      const contacts = JSON.parse(rawData);

      const newContact = {
        id: generateID,
        name,
        email,
        phone,
      };

      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
        if (err) {
          console.error("Error writing contacts file:", err);
          return;
        } else {
          console.log(`Kontakt o nazwie: ${name} został dodany.`);
        }
      });
    }
  });
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
