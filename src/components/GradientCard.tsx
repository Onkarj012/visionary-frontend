import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface GradientCardProps {
  title: string;
  content: ReactNode;
  className?: string;
}

export function GradientCard({
  title,
  content,
  className = "",
}: GradientCardProps) {
  return (
    <Card
      className={`bg-indigo-sky text-white rounded-2xl shadow-lg gradient-hover ${className}`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm opacity-90">{content}</CardContent>
    </Card>
  );
}
