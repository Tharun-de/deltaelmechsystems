import asyncHandler from '../middleware/asyncHandler.js';
import JobApplication from '../models/JobApplication.js';
import ContactForm from '../models/ContactForm.js';

// @desc    Submit a job application
// @route   POST /api/forms/job-application
// @access  Public
export const submitJobApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.create(req.body);
  res.status(201).json({
    success: true,
    data: application
  });
});

// @desc    Submit a contact form
// @route   POST /api/forms/contact
// @access  Public
export const submitContactForm = asyncHandler(async (req, res) => {
  const contact = await ContactForm.create(req.body);
  res.status(201).json({
    success: true,
    data: contact
  });
});

// @desc    Get all job applications
// @route   GET /api/forms/job-applications
// @access  Private/Admin
export const getJobApplications = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const status = req.query.status;

  const query = status ? { status } : {};

  const count = await JobApplication.countDocuments(query);
  const applications = await JobApplication.find(query)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    success: true,
    data: applications,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Get all contact form submissions
// @route   GET /api/forms/contacts
// @access  Private/Admin
export const getContactForms = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const status = req.query.status;

  const query = status ? { status } : {};

  const count = await ContactForm.countDocuments(query);
  const contacts = await ContactForm.find(query)
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('assignedTo', 'name email');

  res.json({
    success: true,
    data: contacts,
    page,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Update job application status
// @route   PUT /api/forms/job-applications/:id
// @access  Private/Admin
export const updateJobApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);

  if (!application) {
    res.status(404);
    throw new Error('Application not found');
  }

  const updatedApplication = await JobApplication.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json({
    success: true,
    data: updatedApplication
  });
});

// @desc    Update contact form status
// @route   PUT /api/forms/contacts/:id
// @access  Private/Admin
export const updateContactForm = asyncHandler(async (req, res) => {
  const contact = await ContactForm.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error('Contact form submission not found');
  }

  const updatedContact = await ContactForm.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('assignedTo', 'name email');

  res.json({
    success: true,
    data: updatedContact
  });
});