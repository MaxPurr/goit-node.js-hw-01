const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact) {
        console.table([contact]);
      } else {
        console.log("Сontact not found.");
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      if (newContact) {
        console.log("A new contact has been added to the list.");
        console.table([newContact]);
      } else console.log(`${name} is already in the contact list.`);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.log("The contact has been removed from the list.");
        console.table([removedContact]);
      } else {
        console.log("Сontact not found.");
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
