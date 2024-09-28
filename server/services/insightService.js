const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.getInsights = async (expenses, incomes) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a financial advisor AI. Analyze the provided financial data and give insights."
        },
        {
          role: "user",
          content: `Analyze this financial data and provide insights:
            Expenses: ${JSON.stringify(expenses)}
            Incomes: ${JSON.stringify(incomes)}`
        }
      ],
      model: "llama3-70b-8192",
    });

    return chatCompletion.choices[0]?.message?.content || "No insights available.";
  } catch (error) {
    console.error('Error getting insights:', error);
    throw error;
  }
};