const mongoose = require('mongoose');

// Define the schema for the career
const careerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    potentialPaths: [{ type: String }],
    skills: [{ type: String }],
    roadmap: [{ type: String }]
});

// Create the model based on the schema
const Career = mongoose.model('Career', careerSchema);

module.exports = Career;
