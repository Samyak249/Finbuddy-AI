const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Function to format number to Indian currency format
const formatToIndianCurrency = (number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  return formatter.format(number);
};

exports.getInsights = async (expenses, incomes) => {
  try {
    // Format expenses and incomes to ensure proper Indian currency representation
    const formattedExpenses = expenses.map(expense => ({
      ...expense,
      amount: formatToIndianCurrency(expense.amount)
    }));

    const formattedIncomes = incomes.map(income => ({
      ...income,
      amount: formatToIndianCurrency(income.amount)
    }));

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert financial advisor AI specializing in Indian personal finance analysis. 
          Provide detailed, actionable insights in the following areas:
          - Income overview and stability (in Indian Rupees - ₹)
          - Spending patterns and major expense categories
          - Savings rate and opportunities
          - Budget optimization suggestions considering Indian market conditions
          - Financial health indicators
          Always present monetary values in Indian Rupees (₹) and include percentages where relevant.
          Structure your response with clear sections using ### for section headers.
          Use Indian context and examples where applicable.`
        },
        {
          role: "user",
          content: `Please analyze this financial data and provide comprehensive insights for an Indian context:
          
          Monthly Financial Data:
          Expenses: ${JSON.stringify(formattedExpenses, null, 2)}
          Income: ${JSON.stringify(formattedIncomes, null, 2)}
          
          Focus on:
          1. Income vs Expense ratio
          2. Major spending categories and their proportions
          3. Unusual patterns or concerning trends
          4. Specific recommendations for improvement considering Indian financial practices
          5. Savings potential and investment suggestions suitable for Indian market
          
          Format recommendations as actionable bullet points.
          Use ₹ symbol for all monetary values.
          Consider Indian financial context (e.g., typical living costs, savings patterns, and investment options in India).`
        }
      ],
      model: "llama-3.3-70b-versatile",
    });

    let response = chatCompletion.choices[0]?.message?.content || "No insights available.";

    // Ensure consistent use of ₹ symbol
    response = response.replace(/Rs\./g, '₹');
    response = response.replace(/INR/g, '₹');

    return response;
  } catch (error) {
    console.error('Error getting insights:', error);
    throw error;
  }
};

