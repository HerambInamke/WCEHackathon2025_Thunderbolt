const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// Route to get all careers
router.get('/', careerController.getAllCareers);

// Route to get career by ID
router.get('/careerId/:id', careerController.getCareerById);

// Route to get career by name
router.post('/careername', careerController.getCareerByName);

module.exports = router;
