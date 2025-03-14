import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyBQETW_62J9qcPSFz7rFkhka9C3IvvI9Ec");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// New function to get questions based on career title
async function getSkillAssessmentQuestions(careerTitle) {
    const prompt = `
    Based on the career title "${careerTitle}", provide a list of 5 skill assessment questions.
    
    The format should be like this:
    - question
    - option1
    - option2
    - option3
    - option4
    - correctAnswer (string)
    - difficulty (one of "beginner", "intermediate", "advanced")

    Example:
        Which data structure would be most efficient for implementing a LIFO collection?
        Queue
        Stack
        Linked List
        Hash Table
        Stack
        beginner
        ...
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text.slice(8, text.length-5))
    try {
        return JSON.parse(text.slice(8, text.length-5));
    } catch (error) {
        console.error("Error parsing response:", error);
        return [];
    }
}

export { getSkillAssessmentQuestions }; // Export the function
