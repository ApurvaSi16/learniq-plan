import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StudyTask {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  type: "study" | "revision" | "practice";
}

interface StudyPlanCardProps {
  tasks: StudyTask[];
  onTaskComplete: (id: string) => void;
}

export const StudyPlanCard = ({ tasks, onTaskComplete }: StudyPlanCardProps) => {
  const completedCount = tasks.filter(t => t.completed).length;
  const totalDuration = tasks.reduce((acc, task) => acc + task.duration, 0);

  const typeColors = {
    study: "text-primary",
    revision: "text-secondary",
    practice: "text-warning",
  };

  return (
    <Card className="p-6 bg-gradient-card border-2 border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground">Today's Study Plan</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {completedCount} of {tasks.length} tasks completed · {totalDuration} min total
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{totalDuration} min</span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
              task.completed
                ? "bg-success/5 border-success/20"
                : "bg-card border-border hover:border-primary/30"
            )}
          >
            <button
              onClick={() => onTaskComplete(task.id)}
              className="flex-shrink-0 transition-transform hover:scale-110"
            >
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-success" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </button>
            <div className="flex-1">
              <p className={cn("font-medium", task.completed ? "text-muted-foreground line-through" : "text-foreground")}>
                {task.title}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className={cn("text-xs font-medium uppercase", typeColors[task.type])}>
                  {task.type}
                </span>
                <span className="text-xs text-muted-foreground">{task.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full mt-6 bg-gradient-primary border-0 font-semibold hover:opacity-90">
        Generate New Plan with AI
      </Button>
    </Card>
  );
};
