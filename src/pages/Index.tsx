import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles, Target, TrendingUp, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-4 bg-gradient-primary rounded-2xl animate-pulse">
              <GraduationCap className="w-12 h-12 text-primary-foreground" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              StudySync AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your intelligent study companion. Track progress, get AI-powered study plans, and achieve your learning goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={() => navigate("/login")}
              className="h-14 px-8 bg-gradient-primary border-0 font-semibold text-lg hover:opacity-90"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 border-2 border-primary/30 font-semibold text-lg hover:bg-primary/5"
            >
              Learn More
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-2xl shadow-soft hover:shadow-medium transition-all">
              <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">AI Study Plans</h3>
              <p className="text-muted-foreground">
                Get personalized daily and weekly study schedules tailored to your learning pace and goals.
              </p>
            </div>

            <div className="p-6 bg-card/80 backdrop-blur-sm border-2 border-secondary/20 rounded-2xl shadow-soft hover:shadow-medium transition-all">
              <div className="p-3 bg-secondary/10 rounded-xl w-fit mb-4">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Smart Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your progress with detailed analytics, completion rates, and performance insights.
              </p>
            </div>

            <div className="p-6 bg-card/80 backdrop-blur-sm border-2 border-success/20 rounded-2xl shadow-soft hover:shadow-medium transition-all">
              <div className="p-3 bg-success/10 rounded-xl w-fit mb-4">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Improve Faster</h3>
              <p className="text-muted-foreground">
                Identify weak areas and get targeted practice to improve your understanding quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
