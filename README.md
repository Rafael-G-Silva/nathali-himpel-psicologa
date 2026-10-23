# Náthali Ellen Himpel · Psicóloga clínica

Site de apresentação da psicóloga **Náthali Ellen Himpel** (CRP 12/27289) para atendimento psicológico online.

Site estático (HTML, CSS e JavaScript puro), publicado no GitHub Pages. Não precisa de build.

## A ideia

A primeira mensagem que alguém manda para a Náthali no WhatsApp ("Olá, Náthali. Quero fazer terapia.") é o
título do site. Os sentimentos que a pessoa pode trazer aparecem dentro das frases como fotos da Baía da
Babitonga e da Serra Dona Francisca, a paisagem de Joinville.

## Seções

1. Topo: a mensagem como título, sobre a Baía da Babitonga
2. Sobre: registro, formação e como são as sessões
3. Check-in: escolha um sentimento na frase e receba uma resposta com a mensagem pronta para o WhatsApp
4. Como posso ajudar: 8 temas, cada um abre o WhatsApp com o assunto
5. Um minuto para respirar: a foto se aproxima e se afasta no ritmo da respiração
6. Como funciona: Chame, Escolha, Entre, Converse
7. Valores: 10 sessões por R$ 1.500 em destaque, depois 4 sessões por R$ 700 e 1 sessão por R$ 190
8. Dúvidas
9. Preço social e WhatsApp (47) 98927-4781

## Como editar

- **WhatsApp:** no topo de `js/main.js` (`WHATSAPP`).
- **Respostas do check-in:** objeto `FEELINGS` em `js/main.js`.
- **Textos e valores:** direto no `index.html`.
- **Cores e tamanhos:** variáveis no topo de `css/style.css`.

## Rodar localmente

```bash
python -m http.server 8000
```

Depois é só abrir http://localhost:8000.

## Créditos das fotos

Fotos via Wikimedia Commons, exibidas em preto e branco: Baía da Babitonga (Vinicius Alberto Mendes Paulino,
CC BY-SA 3.0), série Baía da Babitonga (Otávio Nogueira, CC BY 2.0), vista do Morro do Hospício
(Stanglavine, CC BY-SA 4.0), Pescador e a tarrafa (Chrisporto, CC BY-SA 3.0) e Serra Dona Francisca
(Alexandre Osvaldo, CC BY-SA 4.0). Links completos no rodapé do site e em `img/credits.json`.
