export const skillAssessmentQuestions = {
  // Software Developer (ID: 1)
  1: [
    {
      id: 1,
      question: "Which data structure would be most efficient for implementing a LIFO (Last-In-First-Out) collection?",
      options: [
        "Queue",
        "Stack",
        "Linked List",
        "Hash Table"
      ],
      correctAnswer: "Stack",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "What is the time complexity of a binary search on a sorted array?",
      options: [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      correctAnswer: "O(log n)",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "Which Git command creates a new branch and switches to it?",
      options: [
        "git branch <branch-name>",
        "git checkout <branch-name>",
        "git checkout -b <branch-name>",
        "git switch -c <branch-name>"
      ],
      correctAnswer: "git checkout -b <branch-name>",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "What design pattern is used when you need a single instance of a class throughout the application?",
      options: [
        "Factory Pattern",
        "Observer Pattern",
        "Singleton Pattern",
        "Strategy Pattern"
      ],
      correctAnswer: "Singleton Pattern",
      difficulty: "intermediate"
    },
    {
      id: 5,
      question: "In Agile development, what is a 'user story'?",
      options: [
        "A detailed technical specification",
        "A description of a feature from an end-user perspective",
        "A bug report submitted by users",
        "A narrative of the application's history"
      ],
      correctAnswer: "A description of a feature from an end-user perspective",
      difficulty: "beginner"
    }
  ],
  
  // Data Scientist (ID: 2)
  2: [
    {
      id: 1,
      question: "Which of the following is NOT a supervised learning algorithm?",
      options: [
        "Linear Regression",
        "K-means Clustering",
        "Random Forest",
        "Support Vector Machine"
      ],
      correctAnswer: "K-means Clustering",
      difficulty: "intermediate"
    },
    {
      id: 2,
      question: "What statistical measure represents the middle value in a dataset?",
      options: [
        "Mean",
        "Mode",
        "Median",
        "Range"
      ],
      correctAnswer: "Median",
      difficulty: "beginner"
    },
    {
      id: 3,
      question: "Which Python library is primarily used for data manipulation and analysis?",
      options: [
        "NumPy",
        "Matplotlib",
        "Pandas",
        "Scikit-learn"
      ],
      correctAnswer: "Pandas",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "What technique is used to prevent overfitting in machine learning models?",
      options: [
        "Feature Engineering",
        "Regularization",
        "Data Augmentation",
        "All of the above"
      ],
      correctAnswer: "All of the above",
      difficulty: "advanced"
    },
    {
      id: 5,
      question: "Which evaluation metric is most appropriate for imbalanced classification problems?",
      options: [
        "Accuracy",
        "F1 Score",
        "Mean Squared Error",
        "R-squared"
      ],
      correctAnswer: "F1 Score",
      difficulty: "intermediate"
    }
  ],
  
  // UX/UI Designer (ID: 3)
  3: [
    {
      id: 1,
      question: "What is the purpose of a wireframe in the design process?",
      options: [
        "To create the final visual design",
        "To outline the basic structure and layout",
        "To test the application's performance",
        "To document the code structure"
      ],
      correctAnswer: "To outline the basic structure and layout",
      difficulty: "beginner"
    },
    {
      id: 2,
      question: "Which research method involves observing users in their natural environment?",
      options: [
        "A/B Testing",
        "Surveys",
        "Ethnographic Research",
        "Card Sorting"
      ],
      correctAnswer: "Ethnographic Research",
      difficulty: "intermediate"
    },
    {
      id: 3,
      question: "What is the principle of 'proximity' in design?",
      options: [
        "Similar elements should look similar",
        "Related elements should be grouped together",
        "Elements should be aligned with each other",
        "Elements should contrast with each other"
      ],
      correctAnswer: "Related elements should be grouped together",
      difficulty: "beginner"
    },
    {
      id: 4,
      question: "Which of these is NOT a common prototyping tool?",
      options: [
        "Figma",
        "Adobe XD",
        "Sketch",
        "MongoDB"
      ],
      correctAnswer: "MongoDB",
      difficulty: "beginner"
    },
    {
      id: 5,
      question: "What is a 'heat map' used for in UX research?",
      options: [
        "Showing where users click most frequently",
        "Measuring loading times across different pages",
        "Visualizing the temperature of server rooms",
        "Tracking color usage across the interface"
      ],
      correctAnswer: "Showing where users click most frequently",
      difficulty: "intermediate"
    }
  ],
  
  // Add more career paths as needed...
  // For brevity, I've included just 3 careers with 5 questions each
  // You can expand this with questions for all 10 careers
};

// Helper function to get questions for a specific career
export const getQuestionsForCareer = (careerId) => {
  return skillAssessmentQuestions[careerId] || [];
}; 