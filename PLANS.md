# Plano — Sonhando Acordado Studios

## Objetivo

Construir a Home institucional, cinematográfica e mobile-first do Sonhando Acordado Studios, conectando narrativa, criação, inteligência e sistemas em um único ecossistema e conduzindo o visitante ao contato.

### Fase atual — Centro público de autoridade e portfólio

Evoluir a entrega estática para um portfólio sistêmico com Supabase e painel administrativo seguro, preservando integralmente a Home e mantendo os dados locais como fallback resiliente.

## Estado inicial

- Starter inicial criado, sem personalização visual.
- A continuidade conjunta com Lovable exige React, TypeScript, Vite e Tailwind.
- Uma única rota inicial.
- Sem componentes, dados de marca ou assets finais.
- Referência visual completa fornecida pelo usuário.
- Logo disponível apenas como imagem rasterizada de referência.
- WhatsApp, e-mail e redes sociais ainda não informados.

## Escopo

- Home completa.
- Header e menu mobile acessível.
- Hero cinematográfico.
- Manifesto.
- Quatro universos.
- Projeto em destaque.
- Portfólio configurável.
- Processo de trabalho.
- Sobre.
- CTA final.
- Footer.
- Metadados, robots e sitemap.
- Conteúdo centralizado.
- Responsividade, acessibilidade e performance.
- Banco relacional versionado com Supabase.
- Autenticação e autorização administrativa sem cadastro público.
- Painel para criar, editar, ordenar, destacar, publicar, despublicar e arquivar projetos.
- Portfólio público e página individual de case.
- Mídias e evidências referenciadas por URL.

## Fora de escopo

- Cadastro público e gestão pública de usuários.
- Upload binário nesta etapa; mídias serão armazenadas externamente e referenciadas por URL.
- Editor visual rico/WYSIWYG.
- Pagamentos.
- Métricas inventadas.
- Depoimentos ou clientes fictícios.
- Publicação em produção.
- Rotas profundas completas nesta fase.

## Arquitetura

- `src/App.tsx`: composição da Home.
- `src/components/`: componentes interativos e estruturais.
- `src/config/site.ts`: marca, navegação, links e CTAs.
- `src/data/`: universos, projetos e demais conteúdos estruturados.
- `src/index.css`: tokens e sistema visual mobile-first.
- `public/assets/`: logo, hero e imagens locais.
- `src/services/projects.ts`: leitura pública dos projetos com fallback local.
- `src/integrations/supabase/`: cliente e tipos do banco compatíveis com Lovable.
- `supabase/migrations/`: estrutura versionada do banco, políticas e índices.
- `index.html`: metadados iniciais e dados estruturados.

## Stack compatível com Lovable

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- Componentes funcionais e dados estruturados em `src/`.
- Supabase como backend de conteúdo, usando a integração padrão do Lovable.
- Fallback local imediato para preservar a Home quando o banco estiver vazio ou indisponível.

## Componentes

- `SiteHeader`
- `BrandMark`
- `Hero`
- `SectionHeading`
- `UniverseCard`
- `FeaturedProject`
- `PortfolioGrid`
- `ProcessSteps`
- `AboutStudio`
- `FinalCta`
- `SiteFooter`
- `PortfolioPage`
- `ProjectDetailPage`
- `AdminPage`
- `ProjectForm`
- `ProtectedAdminRoute`

## Conteúdo

- Tese: transformar imaginação em experiências reais.
- Hierarquia: imaginação → transformação → histórias e soluções → personalização → tecnologia → IA.
- Quatro universos apresentados como partes do mesmo processo criativo.
- Projeto “As Aventuras de Lívia e Laura” sem links ou métricas inventadas.
- Portfólio inicial sinalizado como estrutura editorial, sem clientes fictícios.

## Assets

- Produzir hero limpo a partir da referência, sem texto embutido.
- Adaptar a logo fornecida para uso responsivo.
- Criar favicon simples coerente com a marca.
- Usar placeholders editoriais internos apenas onde não houver projeto visual final.

## Design system

- Preto `#0A0A0A`
- Azul-noite `#08131C`
- Marfim `#F5F4EF`
- Dourado fosco `#B89B5E`
- Ardósia `#40464F`
- Sálvia `#5E7462`
- Títulos serifados editoriais.
- Interface sans-serif limpa.
- Bordas finas, profundidade sutil e movimento contido.

## Responsividade

- Base em 360 px.
- Breakpoints progressivos sem depender de largura fixa.
- Hero empilhado no mobile e dividido no desktop.
- Cards em uma coluna, duas colunas e quatro colunas.
- Navegação móvel com botão real, `aria-expanded` e fechamento previsível.
- Tipografia fluida com `clamp()`.

## Acessibilidade

- Ordem de headings.
- Landmark navigation.
- Skip link.
- Foco visível.
- Contraste.
- Teclado.
- Alvos de toque.
- Textos alternativos adequados.
- Reduced motion.
- Sem informação dependente apenas de cor.

## SEO

- Title e description.
- Open Graph e Twitter.
- Canonical configurável.
- Robots e sitemap.
- JSON-LD de Organization sem dados inventados.

## Performance

- Hero otimizado e prioritário por ser LCP.
- Imagens não críticas com lazy loading.
- Sem bibliotecas de animação.
- Interações em CSS e JavaScript mínimo.
- Fontes com fallback e carregamento controlado.

## Testes e validação

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- Verificação visual e funcional do menu e CTAs.
- Inspeção em 360, 390, 768, 1024, 1280, 1440 e 1920 px.
- Verificação de rolagem horizontal.
- Verificação de `prefers-reduced-motion`.
- Testes de fallback e transformação de dados.
- Testes estruturais das migrations e políticas RLS.
- Verificação manual do fluxo de autenticação e CRUD após conectar um projeto Supabase.

## Riscos

1. Logo raster pode perder nitidez; mitigar com tamanhos controlados e registrar necessidade de SVG final.
2. Canais de contato não foram fornecidos; usar valores vazios/configuráveis e CTA com fallback para a seção de contato.
3. Portfólio possui poucos assets finais; evitar clientes, resultados e métricas inventadas.
4. Hero precisa preservar sujeito no mobile; validar `object-position` por breakpoint.
5. Referência desktop é densa; simplificar composição no mobile sem remover conteúdo.
6. Credenciais do Supabase não existem no repositório; o cliente deve permanecer opcional e nunca quebrar a Home.
7. Escrita pública seria insegura; nesta etapa somente projetos publicados podem ser lidos anonimamente e toda escrita permanece bloqueada por RLS.

## Critérios de aceite

- Tese da marca clara no primeiro viewport.
- Quatro universos conectados.
- Visual cinema + cosmos + minimalismo premium.
- Home completa e navegável.
- Mobile-first sem rolagem horizontal.
- WhatsApp configurável.
- Sem conteúdo factual inventado.
- Lint, testes e build aprovados.
- Plano atualizado com evidências.

## Checkpoints

- [x] CP0 — Repositório analisado.
- [x] CP1 — Plano registrado.
- [x] CP2 — Fundação, header e hero.
- [x] CP3 — Manifesto e universos.
- [x] CP4 — Conteúdo institucional.
- [ ] CP5 — Responsividade e acessibilidade.
- [x] CP6 — Testes e build.
- [ ] CP7 — Relatório final.

## Registro de progresso

### Replanejamento 02 — 2026-08-05

- O usuário solicitou a evolução do conteúdo local para um backend compatível com Lovable.
- Supabase foi escolhido por ser a integração de banco padrão do ecossistema Lovable e por não exigir substituir a stack atual.
- A Home existente será preservada; apenas a fonte dos dados de projeto será conectada por um hook resiliente.
- Quando não houver credenciais, registros publicados ou conexão disponível, os conteúdos genéricos locais continuarão visíveis.
- O banco aceitará projeto em destaque de qualquer um dos quatro estúdios, com no máximo um destaque publicado por vez.
- O complemento obrigatório expandiu a etapa para incluir autenticação e painel administrativo completos.
- O modelo passa a relacionar cada projeto com um ou mais estúdios e inclui mídia, links, evidências, narrativa do case e SEO.
- A implementação será feita em `feat/backend-portfolio-admin`; integração na `main` depende de revisão e validações aprovadas.

## Checkpoints da fase sistêmica

- [x] SP0 — `main` sincronizada, instruções e stack inspecionadas.
- [x] SP1 — Escopo e arquitetura replanejados em branch própria.
- [x] SP2 — Migration, RLS, tipos e camada de repositório.
- [x] SP3 — Home ligada ao repositório com fallback preservado.
- [x] SP4 — Listagem pública e página individual.
- [x] SP5 — Autenticação e painel administrativo.
- [x] SP6 — Lint, typecheck, testes, build e revisão do diff.
- [ ] SP7 — Revisão do usuário antes da integração na `main`.

### Evidências SP2–SP6 — 2026-08-05

- Migration com enums, validações, índice de destaque único, allowlist de um administrador e RLS.
- Home preservada e alimentada por `useProjectsContent`, com fallback local imediato.
- Rotas `/portfolio`, `/portfolio/:slug` e `/admin` implementadas.
- Filtros por estúdio, case detalhado, SEO, mídias e links externos implementados.
- Painel com login, CRUD, confirmação de exclusão, publicação, despublicação, arquivamento, destaque e ordem manual.
- `npm run lint`: aprovado.
- `npm run typecheck`: aprovado.
- `npm run test`: 6 testes aprovados.
- `npm run build`: aprovado; CSS 27,95 KB e JavaScript 477,11 KB antes de gzip.
- Smoke test HTTP: `/`, `/portfolio`, `/portfolio/aventuras-livia-laura` e `/admin` retornaram 200 no servidor Vite.

### CP0 — 2026-07-30

- Starter e scripts inspecionados.
- Stack identificada.
- Referências visuais analisadas.
- Lacunas de assets e contatos registradas.

### CP1 — 2026-07-30

- Arquitetura, escopo, riscos e critérios de aceite documentados.

### Replanejamento 01 — 2026-07-30

- O usuário informou que a continuidade será conjunta com o Lovable.
- A fundação foi alterada para a stack compatível: React + TypeScript + Vite + Tailwind.
- A organização foi movida para o padrão `src/`, separando dados e apresentação.
- O `AGENTS.md` fornecido pelo usuário passa a ser a instrução autoritativa do repositório.
- A implementação da interface ainda não havia começado; portanto, a mudança não causou retrabalho visual.

### CP2 — 2026-07-30

- Tokens, tipografia, grid e estrutura mobile-first implementados.
- Header responsivo e menu acessível implementados.
- Hero cinematográfico implementado com asset WebP limpo, sem texto embutido.
- CTAs e dados de contato centralizados.

### CP3 — 2026-07-30

- Manifesto implementado.
- Quatro universos criados a partir de dados tipados.
- Cards com estados de foco, toque e hover progressivo.
- Texto de conexão adicionado para evitar sensação de serviços desconectados.

### CP4 — 2026-07-30

- Projeto em destaque, portfólio, processo, sobre, CTA e footer implementados.
- Nenhum cliente, depoimento, número ou resultado foi inventado.
- Logo raster fornecida aplicada no footer; SVG horizontal permanece pendente.

### CP5 — revisão parcial em 2026-07-30

- CSS revisado para 360, 390, 768, 1024 e 1440 px.
- Menu possui `aria-expanded`, `aria-controls`, fechamento por Escape e alvos de toque.
- Foco visível, skip link, headings, alt text e reduced motion aplicados.
- A visualização automatizada local foi bloqueada pelo ambiente antes de renderizar.
- Revisão visual presencial em mobile e desktop permanece como checkpoint conjunto.

### CP6 — 2026-07-30

- `npm run lint`: aprovado.
- `npm run typecheck`: aprovado.
- `npm run test`: 3 testes aprovados.
- `npm run build`: aprovado.
- Bundle de produção: CSS 23,76 KB; JavaScript 204,46 KB antes de gzip.

## Pendências para o próximo encontro

1. Informar número do WhatsApp e canais sociais.
2. Fornecer logo horizontal em SVG ou aprovar vetor final.
3. Revisar visualmente em 360, 390, 768, 1024 e 1440 px.
4. Confirmar microcopy e ordem final do portfólio.
5. Criar URL canônica e sitemap após definir o domínio.
6. Conectar ao repositório GitHub e enviar a branch `main`.
