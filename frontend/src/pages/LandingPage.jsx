import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { PieChartIcon as ChartPieIcon, WalletCards, TrendingUp, BrainCircuit } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
           
            <span className="text-xl font-bold">FinBuddy AI</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </nav>
      {/* Hero Section with Background */}
      <div className="relative isolate overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)]" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Smart Financial Planning with AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Take control of your finances with FinBuddy AI. Get personalized insights, track expenses, and make smarter financial decisions with our AI-powered platform.
            </p>
            <div className="mt-10 flex gap-x-6">
              <Button size="lg" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Tiles */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose FinBuddy AI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-lg bg-primary/10 p-4 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                <ChartPieIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Expense Tracking</h3>
              <p className="text-muted-foreground">
                Easily track and categorize your expenses. Get a clear view of where your money goes.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-lg bg-primary/10 p-4 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                <WalletCards className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Budget Management</h3>
              <p className="text-muted-foreground">
                Set and manage budgets for different categories. Stay on top of your spending goals.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-lg bg-primary/10 p-4 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">AI Insights</h3>
              <p className="text-muted-foreground">
                Get personalized financial advice powered by advanced AI algorithms.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="rounded-lg bg-primary/10 p-4 mb-4 w-fit group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Financial Growth</h3>
              <p className="text-muted-foreground">
                Track your savings goals and get recommendations for better financial growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making smarter financial decisions with FinBuddy AI.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 FinBuddy AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

