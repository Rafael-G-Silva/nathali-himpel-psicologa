# Nathali Ellen Himpel · Psicóloga Clínica

Site de apresentação da psicóloga **Nathali Ellen Himpel** (Joinville/SC) para atendimento psicológico online.

Site estático (HTML, CSS e JavaScript puro), pronto para o GitHub Pages. Não precisa de build.

## Estrutura

```
index.html        conteúdo do site
css/style.css     visual (cores, fontes, animações)
js/main.js        interações + CONFIGURAÇÃO (WhatsApp e CRP)
assets/           favicon e foto
```

## Como editar

- **WhatsApp e CRP:** no topo de `js/main.js`, no objeto `CONFIG`.
- **Foto da Nathali:** salve a foto como `assets/foto.jpg` (de preferência vertical, 4:5). Ela aparece sozinha no lugar do monograma "NH".
- **Valores dos planos:** na seção `INVESTIMENTO` do `index.html`.
- **Textos:** direto no `index.html`.

## Rodar localmente

```bash
python -m http.server 8000
```

Depois é só abrir http://localhost:8000.
