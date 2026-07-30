import type { Project } from "@/types/content";

export const featuredProject = {
  title: "As Aventuras de Lívia e Laura",
  eyebrow: "Projeto em destaque",
  description:
    "Um universo original criado a partir de amor, imaginação, música e inteligência artificial.",
  features: ["Filme", "Músicas", "Personagens", "Universo narrativo"],
} as const;

export const projects: Project[] = [
  {
    id: "aventuras-livia-laura",
    title: "As Aventuras de Lívia e Laura",
    category: "Filme e universo narrativo",
    summary:
      "Uma experiência cinematográfica familiar que reúne história, personagens e música.",
    status: "disponível",
    visual: "cinema",
  },
  {
    id: "mundos-personalizados",
    title: "Mundos personalizados",
    category: "Narrativa e animação",
    summary:
      "Estrutura criativa para transformar pessoas, ideias e memórias em universos originais.",
    status: "em desenvolvimento",
    visual: "world",
  },
  {
    id: "editoriais-criativos",
    title: "Editoriais criativos",
    category: "Fotografia e conteúdo",
    summary:
      "Direção visual para retratos, campanhas e marcas com identidade e intenção.",
    status: "em desenvolvimento",
    visual: "portrait",
  },
  {
    id: "sistemas-com-proposito",
    title: "Sistemas com propósito",
    category: "Inteligência e produto",
    summary:
      "Soluções digitais estruturadas para organizar conhecimento, processos e experiências.",
    status: "em desenvolvimento",
    visual: "system",
  },
];

