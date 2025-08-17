import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { ReactNode } from "react";

interface GradientBorderCardProps {
  label?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  className?: string;
}

export function GradientBorderCard({
  label,
  title,
  content,
  className = "",
}: GradientBorderCardProps) {
  return (
    <Card
      className={`gradient-border rounded-2xl bg-[#0d0d0d] text-white shadow-lg overflow-hidden cursor-pointer gradient-hover ${className}`}
    >
      <CardHeader>
        {label && (
          <div className="text-xs uppercase tracking-wider font-medium">
            {label}
          </div>
        )}
        {title && <CardTitle className="text-xl font-bold">{title}</CardTitle>}
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
