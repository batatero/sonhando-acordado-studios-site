import { useEffect, useState } from "react";
import { getContactHref, navigation } from "@/config/site";
import { Brand } from "@/components/Brand";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav
          className={`main-navigation ${isOpen ? "main-navigation--open" : ""}`}
          id="main-navigation"
          aria-label="Navegação principal"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            className="header-contact"
            href={getContactHref()}
            onClick={() => setIsOpen(false)}
          >
            Fale conosco
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

