import type { Universe } from "@/types/content";

type UniverseIconProps = {
  name: Universe["icon"];
};

export function UniverseIcon({ name }: UniverseIconProps) {
  const icon = {
    story: "▷",
    creative: "✦",
    ai: "∞",
    systems: "◇",
  }[name];

  return (
    <span className="universe-icon" aria-hidden="true">
      {icon}
    </span>
  );
}

