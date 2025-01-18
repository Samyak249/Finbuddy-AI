import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/hooks/use-toast';
import { IndianRupee, TrendingUp, PieChartIcon, ArrowUpRight, Info } from 'lucide-react';

export default function InsightsPage() {
  const [insights, setInsights] = useState(null);
  const [chartDataExpenses, setChartDataExpenses] = useState([]);
  const [chartDataIncome, setChartDataIncome] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const { toast } = useToast();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const insightsResponse = await fetch('http://localhost:5000/api/insights', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const insightsData = await insightsResponse.json();

        if (insightsResponse.ok) {
          let formattedInsights = insightsData.insights;
          formattedInsights = formattedInsights.replace(/\$/g, '₹');
          formattedInsights = formattedInsights.replace(/₹(\d+(?:,\d+)*)/g, (match, number) => {
            return formatCurrency(number);
          });

          const sections = formattedInsights
            .split('###')
            .filter(Boolean)
            .map(section => {
              const [title, ...content] = section.trim().split('\n');
              return {
                title: title.trim().replace(/\*\*/g, ''),
                content: content.map(p => p.trim().replace(/\*\*/g, '')),
              };
            });

          setInsights({ sections });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: insightsData.message || "Failed to fetch insights",
          });
        }

        const expensesResponse = await fetch('http://localhost:5000/api/expenses/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const expensesData = await expensesResponse.json();

        if (expensesResponse.ok) {
          const chartData = expensesData.map(expense => ({
            name: expense.category.charAt(0).toUpperCase() + expense.category.slice(1),
            value: parseFloat(expense.amount),
          }));
          setChartDataExpenses(chartData);
          setTotalExpenses(chartData.reduce((acc, curr) => acc + curr.value, 0));
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: expensesData.message || "Failed to fetch expenses",
          });
        }

        const incomeResponse = await fetch('http://localhost:5000/api/incomes/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const incomeData = await incomeResponse.json();

        if (incomeResponse.ok) {
          const chartData = incomeData.map(income => ({
            name: income.source.charAt(0).toUpperCase() + income.source.slice(1),
            value: parseFloat(income.amount),
          }));
          setChartDataIncome(chartData);
          setTotalIncome(chartData.reduce((acc, curr) => acc + curr.value, 0));
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: incomeData.message || "Failed to fetch income",
          });
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not connect to server",
        });
      }
    };

    fetchData();
  }, [toast]);

  const formatCurrency = (value) => {
    const numericValue = value.toString().replace(/[₹$,]/g, '');
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Financial Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-green-100 rounded-full">
                    <IndianRupee className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Income</p>
                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalIncome)}</h3>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-red-100 rounded-full">
                    <PieChartIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                    <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalExpenses)}</h3>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Savings Ratio</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {totalIncome ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) + '%' : '0%'}
                    </h3>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-2xl">
                <PieChartIcon className="mr-2 h-6 w-6" />
                Expense Distribution
              </CardTitle>
              <CardDescription className="text-blue-100">
                Breakdown of your monthly expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartDataExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={130}
                    innerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartDataExpenses.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-2xl">
                <PieChartIcon className="mr-2 h-6 w-6" />
                Income Distribution
              </CardTitle>
              <CardDescription className="text-green-100">
                Breakdown of your income sources
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] pt-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartDataIncome}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={130}
                    innerRadius={70}
                    fill="#82ca9d"
                    dataKey="value"
                  >
                    {chartDataIncome.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">AI Analysis</CardTitle>
              <CardDescription className="text-purple-100">
                Personalized financial insights
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {insights ? (
                <div className="space-y-8">
                  {insights.sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">{section.title}</h3>
                      <ul className="list-disc ml-6 space-y-1">
                        {section.content.map((paragraph, idx) => (
                          <li key={idx} className="text-gray-600">{paragraph}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Loading insights...</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
