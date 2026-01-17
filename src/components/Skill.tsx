import { SkillData } from "@/types";

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case "expert":
      return "border-primary/50 bg-primary/10 text-primary";
    case "advanced":
      return "border-accent/50 bg-accent/10 text-accent-foreground";
    default:
      return "border-muted bg-muted/50 text-muted-foreground";
  }
};

const Skill = ({ skill }: { skill: SkillData }) => {
  return (
    <span
      key={skill.name}
      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${getProficiencyColor(
        skill.proficiency ?? "expert"
      )}`}
    >
      {skill.name}
      <span className="ml-2 text-xs opacity-60 capitalize">
        {skill.proficiency}
      </span>
    </span>
  );
};

export default Skill;
