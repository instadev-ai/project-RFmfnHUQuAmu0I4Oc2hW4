import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowBigUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureRequestCardProps {
  title: string;
  description: string;
  upvotes: number;
  date: string;
  status: "pending" | "in-progress" | "completed";
  onUpvote: () => void;
  isUpvoted?: boolean;
}

const FeatureRequestCard = ({
  title,
  description,
  upvotes,
  date,
  status,
  onUpvote,
  isUpvoted = false,
}: FeatureRequestCardProps) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">{title}</h3>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            statusColors[status]
          )}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <Button
            variant={isUpvoted ? "default" : "outline"}
            size="sm"
            onClick={onUpvote}
            className={cn(
              "flex items-center gap-2 transition-all",
              isUpvoted && "bg-blue-500 hover:bg-blue-600"
            )}
          >
            <ArrowBigUp className="h-5 w-5" />
            <span>{upvotes}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureRequestCard;