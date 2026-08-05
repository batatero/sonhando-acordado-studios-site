# AGENTS.md — Sonhando Acordado Studios

## 1. Missão do projeto

Construir o site institucional do **Sonhando Acordado Studios** com uma experiência:

- Mobile-first
- Cinematográfica
- Elegante
- Rápida
- Acessível
- Preparada para evolução futura
- Inicialmente estática
- Estruturada para receber conteúdo sistêmico depois

A marca reúne quatro universos:

1. Story Studio
2. Creative Studio
3. AI Studio
4. Systems Studio

A IA é ferramenta.  
A imaginação, a transformação e a experiência são a mensagem principal.

---

## 2. Regra principal

Antes de alterar qualquer arquivo:

1. Analise a estrutura do repositório.
2. Leia `README.md`, `package.json`, configurações e arquivos existentes.
3. Identifique a stack, os scripts, padrões e convenções.
4. Crie ou atualize `PLANS.md`.
5. Só então implemente.

Não comece codificando sem inspeção.

---

## 3. Estratégia de implementação

O site começa como uma experiência **estática e performática**, mas deve nascer preparado para ser alimentado sistemicamente no futuro.

### Agora

- Conteúdo local
- Dados estruturados em arquivos
- Sem backend
- Sem CMS
- Sem banco de dados
- Sem autenticação
- Sem painel administrativo
- Sem automações externas obrigatórias

### Futuro

A arquitetura deve permitir integração com:

- CMS headless
- APIs
- Banco de dados
- Automação
- Agentes de IA
- Portfólio alimentado dinamicamente
- Formulários conectados a CRM
- Conteúdo gerado sistemicamente
- Múltiplos projetos e universos

Não implementar essas integrações agora.  
Apenas manter a estrutura pronta para recebê-las.

---

## 3.1 Nova fase autorizada — portfólio sistêmico

> Registro histórico: a estratégia estática acima orientou a primeira entrega da
> Home. A partir de 2026-08-05, o usuário autorizou oficialmente uma nova fase.
> Ela não apaga nem invalida o trabalho anterior.

Nesta fase, implementar com a stack compatível com Lovable:

- Supabase para banco PostgreSQL, autenticação e políticas de acesso;
- Portfólio público alimentado por projetos publicados;
- Página individual de case;
- Painel administrativo autenticado, sem cadastro público;
- CRUD, ordenação, destaque e estados `draft`, `published` e `archived`;
- Relação de cada projeto com um ou mais dos quatro estúdios;
- Migrations versionadas e tipos no repositório;
- Fallback local obrigatório quando o banco estiver vazio, indisponível ou sem configuração.

Regras invioláveis desta fase:

- Preservar integralmente a estrutura visual da Home; alterar apenas a origem dos dados do portfólio e do destaque.
- Somente projetos `published` podem aparecer publicamente.
- Não confiar apenas em rotas protegidas: permissões administrativas devem ser impostas por RLS no banco.
- Nunca incluir chaves, tokens ou segredos no Git.
- Não inventar clientes, autorizações, depoimentos, evidências, métricas ou resultados.
- Imagens, vídeos e documentos são referenciados por URL; arquivos binários não pertencem às tabelas.
- Mudanças desta fase devem nascer em branch própria e só chegar à `main` após lint, typecheck, testes, build e revisão.

---

## 4. Arquitetura de conteúdo

Centralize os dados editáveis.

Preferência:

```text
src/
  config/
    site.ts
  data/
    universes.ts
    projects.ts
    navigation.ts
    social.ts
```

Ou siga a convenção equivalente já existente no projeto.

Evite textos duplicados dentro de múltiplos componentes.

Componentes devem consumir dados estruturados.

Exemplo:

```ts
type Universe = {
  id: string
  title: string
  description: string
  services: string[]
  href: string
  icon?: string
}
```

Essa estrutura facilitará a troca futura de dados locais por dados vindos de API ou CMS.

---

## 5. Mobile-first obrigatório

Toda interface deve ser planejada primeiro para telas pequenas.

Validar obrigatoriamente:

- 360 px
- 390 px
- 768 px
- 1024 px
- 1440 px

### Regras mobile

- Sem scroll horizontal
- Sem textos cortados
- Sem botões pequenos
- Sem elementos dependentes apenas de hover
- Menu mobile funcional
- CTAs fáceis de tocar
- Imagem principal com foco bem preservado
- Cards empilhados corretamente
- Tipografia legível
- Espaçamentos consistentes
- Vídeos e imagens responsivos
- Nenhuma seção deve depender de largura desktop para funcionar

A experiência mobile não pode ser uma redução improvisada do desktop.

---

## 6. Direção visual

Conceito:

**Cinema + Cosmos + Minimalismo Premium**

Paleta base:

```css
--color-black: #0A0A0A;
--color-night: #08131C;
--color-ivory: #F5F4EF;
--color-gold: #B89B5E;
--color-slate: #40464F;
--color-sage: #5E7462;
```

Regras:

- Preto e azul-noite como base
- Branco marfim para leitura
- Dourado apenas como assinatura
- Muito espaço negativo
- Linhas finas
- Geometria discreta
- Visual cinematográfico
- Sem neon
- Sem aparência gamer
- Sem excesso de efeitos
- Sem visual infantilizado
- Sem símbolos ocultistas explícitos
- O simbolismo deve aparecer por equilíbrio, órbitas, círculos, proporção e movimento

---

## 7. Tipografia

### Títulos

Preferir serifada editorial e cinematográfica.

Referências:

- Playfair Display
- Cormorant Garamond
- Libre Baskerville

### Textos e interface

Preferir sans-serif limpa.

Referências:

- Inter
- Manrope
- Montserrat

Reutilize fontes existentes no projeto quando adequadas.

Evite adicionar muitas famílias tipográficas.

---

## 8. Componentização

Criar componentes reutilizáveis para:

- Header
- MobileMenu
- Hero
- SectionHeading
- UniverseCard
- ProjectCard
- CTASection
- Footer
- Button
- Container

Evite componentes excessivamente genéricos ou abstrações prematuras.

Priorize:

- Coesão
- Leitura
- Reutilização real
- Baixo acoplamento

---

## 9. Estrutura inicial da home

A Home deve conter:

1. Header
2. Hero
3. Manifesto curto
4. Nossos Universos
5. Projeto em destaque
6. Portfólio
7. Como trabalhamos
8. Sobre o estúdio
9. CTA final
10. Footer

Headline principal:

> Transformamos imaginação em experiências reais.

Texto de apoio:

> Histórias, tecnologia e criatividade para criar mundos que emocionam, conectam e permanecem.

---

## 10. Conteúdo e tom de voz

O conteúdo deve ser:

- Claro
- Emocional
- Sofisticado
- Humano
- Direto
- Imaginativo
- Sem exageros
- Sem clichês vazios
- Sem linguagem genérica de agência

Não comunicar:

> Fazemos tudo com IA.

Comunicar:

> Criamos experiências reais através de imaginação, narrativa, criatividade e tecnologia.

---

## 11. Dados e provas

Não inventar:

- Clientes
- Depoimentos
- Métricas
- Resultados
- Números de projetos
- Países atendidos
- Cases
- Links
- Premiações

Quando faltar informação:

- usar placeholder claramente identificado
- registrar a pendência em `PLANS.md`
- não apresentar conteúdo fictício como fato

---

## 12. Acessibilidade

Aplicar:

- HTML semântico
- Hierarquia correta de headings
- Contraste adequado
- `focus-visible`
- Navegação por teclado
- Alt text
- Botões reais para ações
- Links reais para navegação
- Menu mobile acessível
- `prefers-reduced-motion`
- Áreas de toque adequadas
- Labels em formulários
- Não depender apenas de cor

---

## 13. Performance

Priorizar:

- Imagens WebP ou AVIF
- Lazy loading
- Preload apenas para o recurso principal
- Fontes eficientes
- Poucas dependências
- Pouco JavaScript
- Sem vídeos pesados em autoplay
- Sem animações custosas
- Sem bibliotecas visuais desnecessárias

A imagem do hero deve ser tratada como possível elemento LCP.

---

## 14. SEO inicial

Configurar:

- Title
- Description
- Open Graph
- Canonical
- Favicon
- Metadata
- Sitemap, se aplicável
- Robots
- Schema básico quando adequado

Title sugerido:

> Sonhando Acordado Studios | Histórias, IA e Tecnologia Criativa

Description sugerida:

> Criamos filmes, animações, conteúdos, agentes de IA e soluções digitais que transformam imaginação em experiências reais.

---

## 15. Integração futura

A implementação deve permitir que no futuro:

- `projects.ts` seja substituído por API
- `universes.ts` venha de CMS
- formulários sejam conectados a CRM
- WhatsApp seja integrado a automações
- conteúdos sejam gerados e publicados por agentes
- portfólio seja alimentado sistemicamente

Para isso:

- separar dados de apresentação
- evitar conteúdo hardcoded em componentes
- manter tipos bem definidos
- criar interfaces claras
- não acoplar layout à origem dos dados

Não implementar API agora.

---

## 16. Checkpoints obrigatórios

### CP0 — Inspeção

- Stack identificada
- Scripts identificados
- Assets identificados
- Riscos mapeados

### CP1 — Planejamento

- `PLANS.md` criado ou atualizado
- Escopo definido
- Arquitetura registrada

### CP2 — Fundação

- Tokens
- Tipografia
- Layout
- Header
- Hero

### CP3 — Universos

- Manifesto
- Cards
- Dados estruturados
- Responsividade

### CP4 — Conteúdo institucional

- Projeto em destaque
- Portfólio
- Processo
- Sobre
- CTA
- Footer

### CP5 — Qualidade

- Mobile
- Desktop
- Acessibilidade
- Performance
- SEO
- Links

### CP6 — Validação

- Lint
- Typecheck
- Testes
- Build
- Console sem erros bloqueantes

### CP7 — Entrega

- Relatório final
- Resumo do diff
- Pendências reais
- Próximos passos

---

## 17. Replanejamento obrigatório

Após cada checkpoint:

1. Compare o realizado com `PLANS.md`.
2. Atualize o progresso.
3. Registre desvios.
4. Reavalie riscos.
5. Corrija falhas bloqueantes.
6. Replaneje antes de avançar.

Não force uma decisão antiga se o repositório indicar uma solução melhor.

---

## 18. Comandos e validações

Antes de concluir, execute os scripts existentes equivalentes a:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Use os comandos reais identificados no repositório.

Não declare sucesso sem executar validações.

Se algum comando não existir:

- registre isso
- não invente o resultado
- use a melhor validação disponível

---

## 19. Limites de autonomia

Pode:

- Criar componentes
- Organizar arquivos
- Estruturar dados
- Refinar microcopy
- Melhorar responsividade
- Melhorar acessibilidade
- Melhorar performance
- Criar tokens
- Corrigir problemas dentro do escopo

Não pode:

- Alterar o nome da marca
- Inventar provas
- Criar backend sem solicitação
- Criar CMS agora
- Criar autenticação
- Configurar pagamentos
- Publicar em produção
- Alterar credenciais
- Apagar arquivos relevantes sem justificativa
- Trocar toda a stack sem necessidade
- Expandir o escopo silenciosamente

---

## 20. Formato de resposta do agente

Durante o trabalho, responder com:

### Checkpoint atual

### O que foi analisado

### O que será implementado

### Arquivos envolvidos

### Riscos

### Validação

### Resultado

### Replanejamento

Ser objetivo, sem omitir falhas ou incertezas.

---

## 21. Critérios finais de aceite

O trabalho só está concluído quando:

- A experiência é mobile-first
- A Home comunica claramente a marca
- Os quatro universos parecem conectados
- O site não parece uma lista confusa de serviços
- O hero possui presença cinematográfica
- Os CTAs funcionam
- O conteúdo está centralizado
- A arquitetura está preparada para alimentação sistêmica futura
- Não há dados falsos
- Não há erros bloqueantes
- O build funciona
- `PLANS.md` reflete o trabalho real
- O relatório final apresenta evidências

---

## 22. Princípio final

> Começamos estáticos, mas não desorganizados.

Cada decisão tomada agora deve permitir evolução futura sem obrigar a reconstrução completa do site.
