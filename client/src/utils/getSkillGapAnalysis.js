import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBQETW_62J9qcPSFz7rFkhka9C3IvvI9Ec");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// New function to get skill gap analysis based on questions and user answers
async function getSkillGapAnalysis(careerTitle, questions, userAnswers) {
    const prompt = `
    Based on the career title "${careerTitle}", here are the skill assessment questions and the user's answers:
    
    Questions and Answers:
    ${questions.map((q, index) => `Q${index + 1}: ${q.question}\nYour Answer: ${userAnswers[index]}\n`).join('')}
    
    Please provide a skill gap analysis in the following format:
    point 1
    point 2
    point 3
    point 4
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text)
    try {
        return text.trim().split('\n').map(point => point.trim()).filter(point => point); // Split and clean the response
    } catch (error) {
        console.error("Error processing response:", error);
        return [];
    }
}

export { getSkillGapAnalysis }; // Export the function
