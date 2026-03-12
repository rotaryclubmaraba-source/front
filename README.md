# Rotary Club de Marabá — Frontend

Website institucional do Rotary Club de Marabá com painel administrativo.

## 🚀 Stack

- **Framework**: Next.js 14 (App Router)
- **Deploy**: Vercel
- **Backend**: Render (backend separado)
- **Banco de dados**: MongoDB Atlas
- **Armazenamento**: Cloudinary
- **Acessibilidade**: VLibras

## 📋 Páginas

| Página | Rota | Descrição |
|--------|------|-----------|
| Início | `/` | Hero, valores, diretoria |
| Transparência | `/transparencia` | Portal com documentos públicos |
| Galeria | `/galeria` | Galeria de fotos com lightbox |
| Eventos | `/eventos` | Galeria de eventos |
| Contato | `/contato` | Informações e redes sociais |
| Admin Login | `/admin/login` | Autenticação |
| Dashboard | `/admin/dashboard` | Visão geral |
| Documentos | `/admin/documentos` | CRUD de documentos |
| Galeria Admin | `/admin/galeria` | Upload/remover fotos |
| Eventos Admin | `/admin/eventos` | Upload/remover fotos de eventos |

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com
```

## 🌐 Deploy no Vercel

### Passo a passo:

1. **Faça push para o GitHub:**
   ```bash
   git init
   git add .
   git commit -m "feat: frontend rotary club"
   git remote add origin https://github.com/SEU-USUARIO/rotary-frontend.git
   git push -u origin main
   ```

2. **Acesse [vercel.com](https://vercel.com) e conecte o repositório**

3. **Configure as variáveis de ambiente no Vercel:**
   - `NEXT_PUBLIC_API_URL` = URL do backend no Render (ex: `https://rotary-api.onrender.com`)

4. **Deploy automático!** A Vercel detecta Next.js automaticamente.

## 🔧 Backend no Render

O backend está em `backendRotary/` e deve ser deployado separadamente no Render.

### Variáveis de ambiente necessárias no backend (Render):
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=sua-chave-secreta
CLOUDINARY_CLOUD_NAME=seu-cloud-name
CLOUDINARY_API_KEY=sua-api-key
CLOUDINARY_API_SECRET=seu-api-secret
CORS_ORIGIN=https://seu-frontend.vercel.app
```

## 🏃 Rodar localmente

```bash
npm install
cp .env.example .env.local
# edite .env.local com a URL do backend

npm run dev
# Acesse http://localhost:3000
```

## 📁 Estrutura

```
src/
  app/
    page.tsx              # Página inicial
    transparencia/        # Portal de transparência
    galeria/              # Galeria de fotos
    eventos/              # Galeria de eventos
    contato/              # Página de contato
    admin/
      page.tsx            # Redirect
      login/              # Login admin
      dashboard/          # Dashboard
      documentos/         # Gerenciar documentos
      galeria/            # Gerenciar galeria
      eventos/            # Gerenciar eventos
  components/
    Navbar.tsx            # Barra de navegação
    Footer.tsx            # Rodapé completo
    PublicLayout.tsx      # Layout público
    AdminLayout.tsx       # Layout admin (auth guard)
    AdminSidebar.tsx      # Sidebar admin
    VLibras.tsx           # Plugin VLibras
  lib/
    api.ts                # Axios + todas as chamadas de API
    AuthContext.tsx       # Context de autenticação
  types/
    index.ts              # Types TypeScript
public/
  rotary-logo.png         # Logo do Rotary
```

## 🎨 Cores Oficiais Rotary

| Cor | Hex |
|-----|-----|
| Rotary Royal Blue | `#003F87` |
| Rotary Gold | `#F7A81B` |
