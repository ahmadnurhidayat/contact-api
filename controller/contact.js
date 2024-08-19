const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get All Contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find(); // Fetch all contacts from the database
  res.status(200).json(contacts);
});

// @desc Get by ID Contacts
// @route GET /api/contacts/:id
// @access public
const getContactId = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @desc Create New Contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  
  // Create and save the new contact
  const contact = new Contact({ name, email, phone });
  const savedContact = await contact.save();
  
  res.status(201).json(savedContact);
});

// @desc Update Contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;

  const updatedContact = await contact.save();
  res.status(200).json(updatedContact);
});

// @desc Delete Contacts
// @route DELETE /api/contacts/:id
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.remove();
  res.status(200).json({ message: "Contact deleted", id: req.params.id });
});

module.exports = { 
  getContact, 
  getContactId, 
  createContact, 
  updateContact, 
  deleteContact 
};
