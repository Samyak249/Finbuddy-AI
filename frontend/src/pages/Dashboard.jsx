import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { useToast } from '@/components/hooks/use-toast';
import { PlusCircle, Trash2, IndianRupee, ShoppingCart } from 'lucide-react';

export default function Dashboard() {
  const [incomes, setIncomes] = useState([{ source: '', amount: '' }]);
  const [expenses, setExpenses] = useState([{ category: '', amount: '', description: '' }]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addIncome = () => {
    setIncomes([...incomes, { source: '', amount: '' }]);
  };

  const addExpense = () => {
    setExpenses([...expenses, { category: '', amount: '', description: '' }]);
  };

  const removeIncome = (index) => {
    const newIncomes = incomes.filter((_, i) => i !== index);
    setIncomes(newIncomes);
  };

  const removeExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const handleIncomeChange = (index, field, value) => {
    const newIncomes = [...incomes];
    newIncomes[index][field] = value;
    setIncomes(newIncomes);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = [...expenses];
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const handleSubmit = async () => {
    try {
      // Submit multiple incomes
      for (const income of incomes) {
        if (income.amount && income.source) {
          await fetch('http://localhost:5000/api/incomes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              amount: income.amount,
              source: income.source,
            }),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Each income source must have an amount and source",
          });
          return;
        }
      }

      // Submit multiple expenses
      for (const expense of expenses) {
        if (expense.amount && expense.category) {
          await fetch('http://localhost:5000/api/expenses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              amount: expense.amount,
              category: expense.category,
              description: expense.description,
            }),
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Each expense must have an amount and category",
          });
          return;
        }
      }

      toast({
        title: "Success",
        description: "Your financial data has been submitted successfully.",
      });

      // Navigate to insights page after successful submission
      navigate('/insights');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit data",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Financial Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-2xl">
                <IndianRupee className="mr-2 h-6 w-6" />
                Income Sources
              </CardTitle>
              <CardDescription className="text-blue-100">Add your various income sources here</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                {incomes.map((income, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Input
                      placeholder="Source"
                      value={income.source}
                      onChange={(e) => handleIncomeChange(index, 'source', e.target.value)}
                      className="flex-grow"
                    />
                    <div className="relative flex-shrink-0 w-1/3">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={income.amount}
                        onChange={(e) => handleIncomeChange(index, 'amount', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeIncome(index)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={addIncome} variant="outline" className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Income Source
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-2xl">
                <ShoppingCart className="mr-2 h-6 w-6" />
                Expenses
              </CardTitle>
              <CardDescription className="text-red-100">Log your expenses here</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <Input
                      placeholder="Category"
                      value={expense.category}
                      onChange={(e) => handleExpenseChange(index, 'category', e.target.value)}
                      className="flex-grow"
                    />
                    <div className="relative flex-shrink-0 w-1/4">
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={expense.amount}
                        onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Input
                      placeholder="Description"
                      value={expense.description}
                      onChange={(e) => handleExpenseChange(index, 'description', e.target.value)}
                      className="flex-grow"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeExpense(index)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={addExpense} variant="outline" className="w-full mt-4 bg-red-500 text-white hover:bg-red-600">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center">
          <Button onClick={handleSubmit} size="lg" className="px-8 py-6 text-lg bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105">
            Generate Financial Insights
          </Button>
        </div>
      </div>
    </div>
  );
}

