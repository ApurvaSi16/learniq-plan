import { useState } from "react";
import { ProgressRing } from "@/components/ProgressRing";
import { StatCard } from "@/components/StatCard";
import { StudyPlanCard } from "@/components/StudyPlanCard";
import { WeakAreasCard } from "@/components/WeakAreasCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Button } from "@/components/ui/button";
import { GraduationCap, BookOpen, Target, Clock, Bell, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: "1", title: "Complete Data Structures - Arrays", duration: 45, completed: true, type: "study" as const },
    { id: "2", title: "Revise Object-Oriented Programming", duration: 30, completed: true, type: "revision" as const },
    { id: "3", title: "Practice SQL Queries", duration: 40, completed: false, type: "practice" as const },
    { id: "4", title: "Study Database Normalization", duration: 35, completed: false, type: "study" as const },
    { id: "5", title: "Complete Algorithm Quiz", duration: 25, completed: false, type: "practice" as const },
  ]);

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
                <p className="text-xs text-muted-foreground">Welcome back, Alex!</p>
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
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
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
