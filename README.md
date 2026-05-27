# KEEF Multimarcas Ecommerce

## Stack

- Next.js 15.2.3
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons
- localStorage

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

## Como fazer build

```bash
npm run build
```

## Rotas disponíveis

- `/` - Home
- `/shop` - Todos os produtos
- `/masculino` - Produtos masculinos
- `/feminino` - Produtos femininos
- `/tenis` - Tênis
- `/acessorios` - Acessórios
- `/produto/[slug]` - Detalhes do produto
- `/favoritos` - Favoritos
- `/carrinho` - Carrinho
- `/checkout` - Checkout
- `/pedido-confirmado/[id]` - Pedido confirmado
- `/perfil` - Perfil

## Estrutura principal

```
/app
  - rotas da aplicação
/components
  - componentes reutilizáveis
/data
  - dados dos produtos
/public
  - imagens e assets
/utils
  - funções auxiliares (storage)
```

## Dados locais

### data/products.ts
- Produtos base da loja
- Slugs únicos
- Imagens locais

### localStorage
- `keef-cart` - Itens do carrinho
- `keef-favorites` - IDs dos produtos favoritados
- `keef-orders` - Pedidos locais

## Funcionalidades atuais

- Catálogo completo de produtos
- Visualização de produto individual
- Favoritos (salvos no localStorage
- Carrinho (salvo no localStorage)
- Checkout local (sem pagamento simulado)
- Pedido confirmado
- Perfil com histórico de pedidos

## O que NÃO está implementado ainda

- Supabase (backend real)
- Mercado Pago (pagamento real)
- Admin real
- Deploy
- Login real

## Workflow Git

### Antes de qualquer alteração:

```bash
git add .
git commit -m "checkpoint"
```

### Se algo quebrar:

```bash
git reset --hard HEAD
```

## Próximas fases recomendadas

1. Supabase - Integração de backend real
2. Mercado Pago - Pagamento real em sandbox e produção
3. Admin real - Painel administrativo completo
4. Deploy na Vercel - Deploy profissional
