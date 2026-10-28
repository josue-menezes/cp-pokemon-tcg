# Pokédex TCG — Minhas cartas favoritas

Checkpoint de **Front-End Design Engineering** (FIAP) — Next.js (App Router) + TypeScript + Tailwind, integrado à API Pokémon TCG (`https://api.pokemontcg.io/v2/cards`).

## 🔗 Link público da aplicação

**https://cp-pokemon-tcg.vercel.app**

## 🔑 Acesso

- **Login:** qualquer nome
- **Senha:** `123456` (definida na variável de ambiente `APP_PASSWORD`)

## Integrantes

| Nome | RM |
|---|---|
| Arthur Cordão | 570313 |
| Guilherme Novaes | 570444 |
| Josué Menezes | 569220 |

## Funcionalidades

- **Login** com campos de login e senha; a rota `/api/login` (Route Handler) valida a senha contra a variável de ambiente sensível `APP_PASSWORD`, somente no servidor
- Sessão em cookie `httpOnly` assinado: o usuário continua logado ao atualizar a página; `proxy.ts` bloqueia o acesso de quem não está logado
- **Busca de cartas**: lista pré-carregada (GET na API) e busca por nome conforme o usuário digita, sempre com **no máximo 15 cartas** (`pageSize=15`)
- Cada carta exibe nome (`name`), imagem (`images.large`), número (`nationalPokedexNumbers?.[0]`), tipos (`types`) e HP (`hp`)
- Estados de carregamento, nenhum resultado e erro na API
- **Favoritos** salvos no `localStorage` (continuam após atualizar a página), com indicação visual ★ e página "Favoritas"
- **Logout** no topo da tela, que limpa os favoritos
- **Extra:** página de detalhes da carta (`/cards/[id]`) com ataques, habilidades, fraquezas, coleção, raridade, ilustrador e preço, com botão para favoritar/remover

## Estrutura

```
app/
  page.tsx                 → login
  api/login/route.ts       → valida a senha e cria o cookie de sessão
  api/logout/route.ts      → apaga o cookie
  (private)/layout.tsx     → header com logout (área logada)
  (private)/cards/         → busca de cartas, loading e detalhes [id]
  (private)/favorites/     → cartas favoritas
components/                → componentes de UI
hooks/useFavorites.ts      → favoritos do localStorage
lib/api.ts                 → chamadas à API Pokémon TCG
lib/session.ts             → criação/validação da sessão
lib/favorites.ts           → leitura/escrita no localStorage
lib/team.ts                → integrantes (rodapé)
types/pokemon.ts           → tipagens da API
proxy.ts                   → proteção das rotas
```

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # defina APP_PASSWORD
npm run dev
```
