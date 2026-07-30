import { UniverseIcon } from "@/components/UniverseIcon";
import type { Universe } from "@/types/content";

type UniverseCardProps = {
  universe: Universe;
};

export function UniverseCard({ universe }: UniverseCardProps) {
  return (
    <article className={`universe-card universe-card--${universe.icon}`}>
      <div className="universe-card__top">
        <span className="universe-card__number">{universe.number}</span>
        <UniverseIcon name={universe.icon} />
      </div>
      <h3>{universe.title}</h3>
      <p>{universe.description}</p>
      <ul>
        {universe.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>
      <a href={universe.href}>
        Explorar <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}

