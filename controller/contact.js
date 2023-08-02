const asyncHandler = require('express-async-handler');

// @desc Get All Contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler (async (req, res) => {
    res.status(200).json({ message: 'Get all contacts' });
});

// @desc Get by ID Contacts
// @route GET /api/contacts/:id
// @access public
const getContactId = asyncHandler (async (req, res) => {
  res.status(200).json({ message: `Get Contact for ${req.params.id}` });
});

// @desc Create New Contacts
// @route POST /api/contacts
// @access public
const createContact = asyncHandler (async (req, res) => {
  console.log("The request:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  res.status(201).json({ message: "Create Contacts", data: req.body });
});

// @desc Update Contacts
// @route PUT /api/contacts/:id
// @access public
const updateContact = asyncHandler (async (req, res) => {
  res.status(200).json({ message: `Update Contacts for ${req.params.id}` });
});

// @desc Delete Contacts
// @route DEL /api/contacts/:id
// @access public
const deleteContact = asyncHandler (async (req, res) => {
  res.status(200).json({ message: `Delete Contacts for ${req.params.id}` });
});


module.exports = { 
    getContact, 
    getContactId, 
    createContact, 
    updateContact, 
    deleteContact 
};