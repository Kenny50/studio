import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TransformationStepCardProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: ReactNode;
}

export default function TransformationStepCard({ stepNumber, title, description, icon }: TransformationStepCardProps) {
  return (
    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-primary">Step {stepNumber}</p>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
