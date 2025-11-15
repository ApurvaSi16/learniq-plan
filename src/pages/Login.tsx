import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back! 🎉");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden md:block">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <GraduationCap className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  StudySync AI
                </h1>
                <p className="text-muted-foreground">Smart Learning Assistant</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">AI-Powered Study Plans</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized daily and weekly study schedules based on your progress
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-secondary/10 rounded-lg mt-1">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Progress Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    Monitor your learning journey with detailed analytics and insights
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-success/10 rounded-lg mt-1">
                  <Sparkles className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Weak Area Detection</h3>
                  <p className="text-sm text-muted-foreground">
                    Identify and improve on topics that need more attention
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <Card className="p-8 bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-strong">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-2 justify-center mb-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">StudySync AI</h1>
            </div>
            <p className="text-center text-sm text-muted-foreground">Smart Learning Assistant</p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to continue your learning journey</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 border-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-2"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-primary border-0 font-semibold text-lg hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button className="text-sm text-primary hover:text-primary-dark font-medium transition-colors">
              Forgot your password?
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button className="text-primary hover:text-primary-dark font-semibold transition-colors">
                Sign up for free
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
