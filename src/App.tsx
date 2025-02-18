import { useState } from "react";
import FeatureRequestCard from "./components/FeatureRequestCard";
import NewFeatureForm from "./components/NewFeatureForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeatureRequest {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  date: string;
  status: "pending" | "in-progress" | "completed";
  isUpvoted: boolean;
}

function App() {
  const [features, setFeatures] = useState<FeatureRequest[]>([
    {
      id: 1,
      title: "Dark Mode Support",
      description: "Add dark mode theme support for better night-time viewing",
      upvotes: 15,
      date: new Date().toLocaleDateString(),
      status: "pending",
      isUpvoted: false,
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Create a mobile app version for iOS and Android",
      upvotes: 8,
      date: new Date().toLocaleDateString(),
      status: "in-progress",
      isUpvoted: false,
    },
  ]);

  const [sortBy, setSortBy] = useState("upvotes");

  const handleNewFeature = (data: { title: string; description: string }) => {
    const newFeature: FeatureRequest = {
      id: features.length + 1,
      title: data.title,
      description: data.description,
      upvotes: 0,
      date: new Date().toLocaleDateString(),
      status: "pending",
      isUpvoted: false,
    };
    setFeatures([...features, newFeature]);
  };

  const handleUpvote = (id: number) => {
    setFeatures(
      features.map((feature) => {
        if (feature.id === id) {
          return {
            ...feature,
            upvotes: feature.isUpvoted
              ? feature.upvotes - 1
              : feature.upvotes + 1,
            isUpvoted: !feature.isUpvoted,
          };
        }
        return feature;
      })
    );
  };

  const sortedFeatures = [...features].sort((a, b) => {
    if (sortBy === "upvotes") {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Feature Requests</h1>
          <NewFeatureForm onSubmit={handleNewFeature} />
        </div>

        <div className="mb-6">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upvotes">Most Upvoted</SelectItem>
              <SelectItem value="date">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {sortedFeatures.map((feature) => (
            <FeatureRequestCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              upvotes={feature.upvotes}
              date={feature.date}
              status={feature.status}
              isUpvoted={feature.isUpvoted}
              onUpvote={() => handleUpvote(feature.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;