import { useState, useEffect } from "react";
import { ProgressRing } from "@/components/ProgressRing";
import { StatCard } from "@/components/StatCard";
import { StudyPlanCard } from "@/components/StudyPlanCard";
import { WeakAreasCard } from "@/components/WeakAreasCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Target, Clock, Bell, Settings, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([
    { id: "1", title: "Complete Data Structures - Arrays", duration: 45, completed: true, type: "study" as const },
    { id: "2", title: "Revise Object-Oriented Programming", duration: 30, completed: true, type: "revision" as const },
    { id: "3", title: "Practice SQL Queries", duration: 40, completed: false, type: "practice" as const },
    { id: "4", title: "Study Database Normalization", duration: 35, completed: false, type: "study" as const },
    { id: "5", title: "Complete Algorithm Quiz", duration: 25, completed: false, type: "practice" as const },
  ]);

  useEffect(() => {
    // Check authentication and fetch user profile
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      setUser(session.user);

      // Fetch profile
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (profileData) {
        setProfile(profileData);
      }

      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const performanceData = [
    { day: "Mon", timeSpent: 120, score: 75 },
    { day: "Tue", timeSpent: 90, score: 82 },
    { day: "Wed", timeSpent: 150, score: 78 },
    { day: "Thu", timeSpent: 110, score: 85 },
    { day: "Fri", timeSpent: 130, score: 88 },
    { day: "Sat", timeSpent: 95, score: 80 },
    { day: "Sun", timeSpent: 140, score: 92 },
  ];

  const weakAreas = [
    { topic: "Advanced Algorithms", score: 45, attempts: 8 },
    { topic: "Database Design", score: 58, attempts: 5 },
    { topic: "Network Security", score: 62, attempts: 6 },
  ];

  const handleTaskComplete = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-primary animate-pulse mx-auto" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-xl">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  StudySync AI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Welcome back, {profile?.full_name || user?.email?.split('@')[0] || 'Student'}!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/30">
                <UserIcon className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-medium text-accent-foreground">
                  {profile?.full_name || user?.email?.split('@')[0]}
                </span>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Completed Topics"
            value="42/68"
            icon={BookOpen}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Weekly Study Time"
            value="8.5 hrs"
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Average Score"
            value="82%"
            icon={Target}
            trend={{ value: 5, isPositive: true }}
            variant="default"
          />
          <StatCard
            title="Streak Days"
            value="15"
            icon={GraduationCap}
            variant="success"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <StudyPlanCard tasks={tasks} onTaskComplete={handleTaskComplete} />
            <PerformanceChart data={performanceData} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex flex-col items-center p-6 bg-gradient-card border-2 border-primary/20 rounded-2xl">
              <ProgressRing progress={62} size={160} strokeWidth={14} label="Overall Progress" />
              <p className="text-center text-sm text-muted-foreground mt-4">
                You've completed 62% of your course syllabus. Keep up the great work!
              </p>
            </div>

            <WeakAreasCard weakAreas={weakAreas} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
