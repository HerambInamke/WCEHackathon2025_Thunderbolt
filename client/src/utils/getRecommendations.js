import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBQETW_62J9qcPSFz7rFkhka9C3IvvI9Ec");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// New function to get recommendations based on answers
async function getRecommendations(answersWithQuestions) {
    const prompt = `
    Based on the following answers, provide career recommendations:
    ${JSON.stringify(answersWithQuestions)}

    careersOptions: ${JSON.stringify([
        "Software Developer",
        "Data Scientist",
        "UX/UI Designer",
        "Digital Marketing Specialist",
        "Registered Nurse",
        "Financial Analyst",
        "Human Resources Manager",
        "Project Manager",
        "Civil Engineer",
        "Elementary School Teacher",
        "Graphic Designer",
        "Content Writer",
        "Sales Representative",
        "Physical Therapist",
        "Product Manager",
        "Accountant",
        "Social Media Manager",
        "Cybersecurity Analyst",
        "Customer Service Representative",
        "Operations Manager",
        "Chef",
        "Research Scientist",
        "Event Planner",
        "Video Editor",
        "Environmental Engineer",
        "Public Relations Specialist",
        "Mechanical Engineer",
        "Business Analyst",
        "Interior Designer",
        "Pharmacist",
        "Supply Chain Manager",
        "Lawyer",
        "Recruiter",
        "Clinical Psychologist",
        "Architect",
        "Electrician",
        "Airline Pilot",
        "Social Worker",
        "SEO Specialist",
        "Veterinarian",
        "Web Developer",
        "Flight Attendant",
        "Dental Hygienist",
        "Criminal Investigator",
        "Art Director",
        "Logistics Coordinator",
        "Game Developer",
        "Journalist",
        "Urban Planner",
        "Investment Banker",
        "Personal Trainer",
        "Fashion Designer",
        "Speech-Language Pathologist",
        "Film Director",
        "Environmental Scientist",
        "Cloud Solutions Architect", "DevOps Engineer", "Machine Learning Engineer", "Blockchain Developer", "Quantum Computing Researcher", "Robotics Engineer", "Artificial Intelligence Specialist", "Augmented Reality Developer", "Virtual Reality Designer", "Bioinformatics Scientist", "Geneticist", "Epidemiologist", "Medical Doctor", "Surgeon", "Anesthesiologist", "Nurse Practitioner", "Physician Assistant", "Occupational Therapist", "Respiratory Therapist", "Dietitian/Nutritionist", "Forensic Accountant", "Actuary", "Risk Management Specialist", "Compliance Officer", "Tax Consultant", "Technical Writer", "Copywriter", "Brand Strategist", "Market Research Analyst", "E-commerce Manager", "User Experience Researcher", "Information Security Engineer", "Network Administrator", "Database Administrator", "System Administrator", "Industrial Designer"

    ])}

      give me top 4 career recommendation titles(from the provided career options only) seperated by comma only(no description). 
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text.split(',').map(career => career.trim()))
    return text.split(',').map(career => career.trim()); // Assuming the response is in JSON format
}

export { getRecommendations }; // Export the new function