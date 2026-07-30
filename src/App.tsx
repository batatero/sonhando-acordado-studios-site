import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";
import { UniverseCard } from "@/components/UniverseCard";
import { getContactHref, siteConfig } from "@/config/site";
import { processSteps } from "@/data/process";
import { featuredProject, projects } from "@/data/projects";
import { universes } from "@/data/universes";

function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero__image" aria-hidden="true" />
          <div className="hero__veil" aria-hidden="true" />
          <Container className="hero__content">
            <p className="eyebrow hero__eyebrow">Criatividade que atravessa mundos</p>
            <h1 id="hero-title">
              Transformamos imaginação em{" "}
              <span>experiências reais.</span>
            </h1>
            <p className="hero__text">{siteConfig.supportingText}</p>
            <div className="hero__actions">
              <Button href="#universos">Conheça nossos universos</Button>
              <Button href={getContactHref()} variant="ghost">
                Fale conosco
              </Button>
            </div>
            <p className="hero__signature">
              <span>Criamos mundos.</span>
              Você sonha. Nós damos vida.
            </p>
          </Container>
          <a className="hero__scroll" href="#manifesto" aria-label="Continuar para o manifesto">
            <span>Explore</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="manifesto section" id="manifesto">
          <Container>
            <p>Entre a imaginação e a realidade existe uma história.</p>
            <h2>Nós construímos a ponte.</h2>
          </Container>
        </section>

        <section className="universes section" id="universos">
          <Container>
            <SectionHeading
              eyebrow="O que fazemos"
              title="Nossos Universos"
              description="Quatro formas de transformar ideias em histórias, conexões, inteligência e evolução."
              align="center"
            />
            <div className="universes__grid">
              {universes.map((universe) => (
                <UniverseCard key={universe.id} universe={universe} />
              ))}
            </div>
            <p className="universes__connection">
              Não são serviços isolados. São camadas de um mesmo ecossistema
              criativo, construído para imaginar, conectar e transformar.
            </p>
          </Container>
        </section>

        <section className="featured section" aria-labelledby="featured-title">
          <Container className="featured__layout">
            <div className="featured__visual">
              <img
                src="/assets/hero-sonhando-acordado-studios.webp"
                alt="Menino observa um céu estrelado diante de um castelo distante"
                loading="lazy"
              />
              <span className="featured__badge">Universo original</span>
            </div>
            <div className="featured__content">
              <p className="eyebrow">{featuredProject.eyebrow}</p>
              <h2 id="featured-title">{featuredProject.title}</h2>
              <p>{featuredProject.description}</p>
              <ul>
                {featuredProject.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button href="#portfolio" variant="ghost">
                Conheça o universo
              </Button>
            </div>
          </Container>
        </section>

        <section className="portfolio section" id="portfolio">
          <Container>
            <SectionHeading
              eyebrow="Portfólio"
              title="Histórias e soluções que já se tornaram reais."
              description="Uma estrutura viva para reunir produções, experiências criativas e soluções do estúdio sem inventar resultados."
            />
            <div className="portfolio__grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </Container>
        </section>

        <section className="process section" aria-label="Como trabalhamos">
          <Container>
            <SectionHeading
              eyebrow="Como trabalhamos"
              title="Da verdade à experiência."
              description="Cada projeto começa com uma verdade, ganha forma através da criatividade e se torna real com tecnologia."
            />
            <ol className="process__grid">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <section className="about section" id="sobre">
          <Container className="about__layout">
            <div className="about__title">
              <p className="eyebrow">Sobre o estúdio</p>
              <h2>Criatividade, tecnologia e propósito caminhando juntos.</h2>
            </div>
            <div className="about__copy">
              <p>
                O Sonhando Acordado Studios nasceu da vontade de transformar
                sonhos em experiências reais através da união entre arte,
                narrativa, inteligência artificial e tecnologia.
              </p>
              <p>
                Aqui, tecnologia não substitui sensibilidade. Ela amplia o que
                podemos imaginar, construir e compartilhar.
              </p>
              <a href="#contato">
                Conheça nossa visão <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="about__seal" aria-hidden="true">
              <span>✦</span>
              <p>Imaginar<br />Criar<br />Transformar</p>
            </div>
          </Container>
        </section>

        <section className="final-cta section" id="contato">
          <Container>
            <div className="final-cta__orbit" aria-hidden="true" />
            <p className="eyebrow">Vamos criar juntos</p>
            <h2>Qual mundo você quer tirar da imaginação?</h2>
            <p>
              Conte sua ideia. Nós ajudamos a transformar o invisível em uma
              experiência real.
            </p>
            <Button href={getContactHref()}>Conte seu projeto</Button>
            {!siteConfig.contact.whatsapp && (
              <small>
                O número do WhatsApp ainda precisa ser adicionado à configuração
                do projeto.
              </small>
            )}
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
