# Sonhando Acordado Studios

Site institucional do Sonhando Acordado Studios, desenvolvido com a mesma fundação utilizada pelo Lovable: React, TypeScript, Vite e Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Estrutura

- `src/components`: componentes visuais reutilizáveis.
- `src/config`: informações gerais da marca e links.
- `src/data`: universos, projetos e conteúdos editáveis.
- `public/assets`: imagens e identidade visual.
- `PLANS.md`: plano, checkpoints e pendências.
- `AGENTS.md`: regras específicas para agentes de desenvolvimento.

## Portfólio e backend

O projeto usa Supabase, a integração de backend compatível com Lovable. Sem as
variáveis de ambiente ou sem projetos publicados, a Home e o portfólio usam o
conteúdo local de `src/data/projects.ts` automaticamente.

1. Crie um projeto no Supabase.
2. Copie `.env.example` para `.env.local` e preencha apenas a URL e a chave pública.
3. Aplique `supabase/migrations/20260805120000_create_portfolio.sql` pelo fluxo de migrations do Lovable/Supabase.
4. Crie a única conta administrativa em Authentication > Users.
5. No SQL Editor, adicione o UUID dessa conta à allowlist:

```sql
insert into public.admin_profiles (user_id, display_name)
values ('UUID-DO-USUARIO', 'Administrador');
```

O índice `admin_profiles_single_admin_idx` limita a allowlist a uma conta. Não há
tela de cadastro público. A RLS permite leitura anônima apenas de projetos
publicados e bloqueia todas as escritas para quem não estiver na allowlist.

Rotas:

- `/portfolio`: listagem com filtros por estúdio.
- `/portfolio/:slug`: página individual do case.
- `/admin`: login e gestão do portfólio.

Imagens, vídeos, documentos, demonstrações, GPTs e repositórios são armazenados
como URLs. Nenhum arquivo binário pesado é gravado diretamente na tabela.
