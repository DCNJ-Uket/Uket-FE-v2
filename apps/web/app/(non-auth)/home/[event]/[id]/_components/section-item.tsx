interface SectionItemProps {
  title: string;
  item: React.ReactNode;
}

export default function SectionItem({ title, item }: SectionItemProps) {
  return (
    <div className="space-y-2">
      <h1 className="text-lg font-bold">{title}</h1>
      {item}
    </div>
  );
}
