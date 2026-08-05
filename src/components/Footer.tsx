import { navigation, siteConfig } from "@/config/site";
import { universes } from "@/data/universes";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img
            className="site-footer__logo"
            src="/assets/logo-sonhando-acordado.png"
            alt="Sonhando Acordado Studios"
            width="1536"
            height="1536"
            loading="lazy"
          />
          <p>
            Transformamos imaginação em experiências reais através de histórias,
            criatividade e tecnologia.
          </p>
        </div>

        <div>
          <h2>Navegação</h2>
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Universos</h2>
          <ul>
            {universes.map((universe) => (
              <li key={universe.id}>
                <a href="/#universos">{universe.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Contato</h2>
          <p className="site-footer__pending">
            Canais em configuração.
            <br />
            Atualize em <code>src/config/site.ts</code>.
          </p>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>Imaginação com propósito.</span>
      </div>
    </footer>
  );
}
