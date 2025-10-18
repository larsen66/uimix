interface Feature {
  name: string;
  description: string;
}

interface FeaturesListProps {
  features: Feature[];
}

export const FeaturesList = ({ features }: FeaturesListProps) => {
  return (
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <span className="text-primary font-semibold">•</span>
          <div>
            <span className="font-medium">{feature.name}</span>
            <span className="text-muted-foreground"> - {feature.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};
