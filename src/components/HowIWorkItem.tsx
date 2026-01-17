const HowIWorkItem = ({
  item,
  index,
}: {
  item: {
    title: string;
    description: string;
  };
  index: number;
}) => {
  return (
    <div
      key={item.title}
      className="group p-6 rounded-lg border border-border/50 bg-card/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {item.title}
        </h3>
      </div>
      <p className="body-sm text-muted-foreground">{item.description}</p>
    </div>
  );
};

export default HowIWorkItem;
