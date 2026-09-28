# Puravie

Site Next.js exportado como arquivos estáticos, com versões em português (`/pt/`), inglês (`/en/`) e espanhol (`/es/`).

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Publicação em Apache

```bash
npm ci
npm run build
```

Publique **o conteúdo de `out/`**, incluindo o arquivo oculto `out/.htaccess`, na raiz pública do domínio (por exemplo, `public_html/`). Não publique a pasta `out` como subpasta. A exportação contém os diretórios das páginas, os recursos em `_next/` e `404.html`; não é necessário executar Node.js no servidor.

O `.htaccess` exige `mod_rewrite` para redirecionar `/` para `/pt/`. O Apache precisa permitir a leitura de `.htaccess` (`AllowOverride` apropriado). As rotas existentes são servidas pelos respectivos diretórios com `index.html`, e caminhos inexistentes usam `404.html`.

Como esta é uma exportação estática, o `middleware.ts` não executa no servidor. O redirecionamento inicial está configurado no Apache; se a hospedagem não usar Apache, configure a regra equivalente no servidor utilizado.
