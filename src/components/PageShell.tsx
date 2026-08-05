import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

import { Brand } from "@/components/Brand";
import { Footer } from "@/components/Footer";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <header className="page-header">
        <div className="container page-header__inner">
          <Link to="/" aria-label="Voltar para a página inicial">
            <Brand />
          </Link>
          <nav aria-label="Navegação da página">
            <Link to="/">Início</Link>
            <Link to="/portfolio">Portfólio</Link>
          </nav>
        </div>
      </header>
      <main id="conteudo" className="inner-page">
        {children}
      </main>
      <Footer />
    </>
  );
}
