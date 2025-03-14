const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to get career recommendations from Gemini API
router.post('/recommendations', async (req, res) => {
    const { answers } = req.body; // Extract answers from the request body

    try {
        // Call the Gemini API with the answers
        const response = await axios.post('https://api.gemini.com/recommendations', {
            answers: answers
        });

        // Assuming the API returns an array of career objects with titles
        const recommendedCareers = response.data.recommendations;

        // Extract only the titles of the recommended careers
        const careerTitles = recommendedCareers.map(career => career.title);

        // Send the titles back to the client
        res.json({ recommendations: careerTitles });
    } catch (error) {
        console.error('Error fetching recommendations from Gemini API:', error);
        res.status(500).json({ message: 'Failed to fetch recommendations' });
    }
});

module.exports = router;
