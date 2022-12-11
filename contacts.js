const { group } = require("console");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

function getListContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    console.group("=============   List of Contacts   ==========");
    console.table(JSON.parse(data));
    console.groupEnd();
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contactsList = JSON.parse(data);

    const contact = contactsList.find((contact) => {
      if (contact.id === contactId.toString()) {
        console.log("Contact By ID: ", contact);
        return contact;
      }
    });

    if (!contact) console.log(`Contact with ID "${contactId}" not found!`);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;

    const contactsList = JSON.parse(data);

    const newContactsList = contactsList.filter(
      (contact) => contact.id !== contactId.toString()
    );

    if (newContactsList.length === contactsList.length) {
      console.log(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
      return;
    }

    console.log(
      `Contact id "${contactId}" deleted successfully! New list of contacts: `
    );
    console.table(newContactsList);

    fs.writeFile(contactsPath, JSON.stringify(newContactsList), (error) => {
      if (error) throw error;
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) throw error;
    const contactList = JSON.parse(data);

    const newContact = {
      id: crypto.randomBytes(16).toString("hex"),
      name,
      email,
      phone,
    };

    contactList.push(newContact);

    console.log("Contacts added successfully! New lists of contacts: ");
    console.table(contactList);

    fs.writeFile(contactsPath, JSON.stringify(contactList), (error) => {
      if (error) throw error;
    });
  });
}

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
};
