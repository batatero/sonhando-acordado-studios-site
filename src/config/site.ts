import type { NavigationItem } from "@/types/content";

export const siteConfig = {
  name: "Sonhando Acordado Studios",
  shortName: "Sonhando Acordado",
  description:
    "Criamos filmes, animações, conteúdos, agentes de IA e soluções digitais que transformam imaginação em experiências reais.",
  headline: "Transformamos imaginação em experiências reais.",
  supportingText:
    "Histórias, tecnologia e criatividade para criar mundos que emocionam, conectam e permanecem.",
  url: "",
  contact: {
    whatsapp: "",
    email: "",
  },
  social: {
    instagram: "",
    youtube: "",
    linkedin: "",
  },
} as const;

export const navigation: NavigationItem[] = [
  { label: "Início", href: "/#inicio" },
  { label: "Universos", href: "/#universos" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export function getContactHref() {
  const phone = siteConfig.contact.whatsapp.replace(/\D/g, "");

  if (!phone) {
    return "#contato";
  }

  const message = encodeURIComponent(
    "Olá! Quero conversar sobre uma ideia com o Sonhando Acordado Studios.",
  );

  return `https://wa.me/${phone}?text=${message}`;
}
