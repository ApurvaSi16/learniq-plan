import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, TrendingDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeakArea {
  topic: string;
  score: number;
  attempts: number;
}

interface WeakAreasCardProps {
  weakAreas: WeakArea[];
}

export const WeakAreasCard = ({ weakAreas }: WeakAreasCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-2 border-warning/20">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-5 h-5 text-warning" />
            <h3 className="text-xl font-bold text-foreground">Areas to Improve</h3>
          </div>
          <p className="text-sm text-muted-foreground">Focus on these topics to boost your performance</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {weakAreas.map((area, index) => (
          <div key={index} className="p-4 rounded-xl bg-card border-2 border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">{area.topic}</span>
              <span className="text-sm font-semibold text-warning">{area.score}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden mr-3">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    area.score < 40 ? "bg-destructive" : area.score < 60 ? "bg-warning" : "bg-success"
                  )}
                  style={{ width: `${area.score}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{area.attempts} attempts</span>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-semibold">
        <Sparkles className="w-4 h-4 mr-2" />
        Get AI Improvement Plan
      </Button>
    </Card>
  );
};
