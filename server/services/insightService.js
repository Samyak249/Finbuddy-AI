const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getInsights = async (expenses, incomes) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert financial advisor AI specializing in personal finance analysis. 
          Provide detailed, actionable insights in the following areas:
          - Income overview and stability
          - Spending patterns and major expense categories
          - Savings rate and opportunities
          - Budget optimization suggestions
          - Financial health indicators
          Always present monetary values clearly and include percentages where relevant.
          Structure your response with clear sections and bullet points for readability.`
        },
        {
          role: "user",
          content: `Please analyze this financial data and provide comprehensive insights:
          
          Monthly Financial Data:
          Expenses: ${JSON.stringify(expenses, null, 2)}
          Income: ${JSON.stringify(incomes, null, 2)}
          
          Focus on:
          1. Income vs Expense ratio
          2. Major spending categories and their proportions
          3. Unusual patterns or concerning trends
          4. Specific recommendations for improvement
          5. Savings potential
          
          Format recommendations as actionable bullet points.`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "No insights available.";
  } catch (error) {
    console.error('Error getting insights:', error);
    throw error;
  }
};