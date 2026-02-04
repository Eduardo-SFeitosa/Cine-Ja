# Cine Já

Cine Já é uma aplicação full stack que consome REST API para informar ao usuario filmes e sessoes disponiveis.

Projeto feito utilizando React, Node.js e MySQL.

## Funcionalidades
- Listagem de filmes consumindo uma API REST
- Exibição de pôster, título, duração, gênero e classificação indicativa
- Componentes reutilizáveis no frontend
- Backend com rotas separadas
- Banco de dados MySQL

## Tecnologias Utilizadas

### Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend
- Node.js
- Express
- Sequelize
- MySQL
- CORS


# Estrutura do projeto

## Front-end
Páginas e componentes auxiliares que a aplicação utiliza para interfaces de usuario

### Páginas
- [Página Inicial](#Pagina-Inicial) 
- [Página de Filmes](#Pagina-de-Filmes) 

### Componentes reutilizaveis
- [Miniatura](#Miniatura) 

## Back-end
Rotas das APIs utilizadas pela aplicação.

### APIs
- [/filmes](#/filmes)
- [/filmes/:titulo](#/filmes/:titulo)
- [/sessoes/:titulo](#/sessoes/:titulo)

## Banco de dados
Tabelas utilizadas para armazenar os dados.

### Tabelas
- [filmes-db](#filmes-db)
- [cinemas-db](#cinemas-db)
- [sessões-disponiveis-db](#sessões-disponiveis-db) 

# Pagina-Inicial
Página principal do projeto que atua como home page.
Usa um fetch para pesquisar todos os filmes disponiveis então utiliza [Miniatura](#Miniatura) para criar as miniaturas de todos os filmes do catalogo.

# Pagina-de-Filmes
Uma página especifica para um filme que mostra todas as informações do filme usando [/filmes/:titulo](#/filmes/:titulo) e em quais cinemas está disponivel e em quais hórarios usando [/sessoes/:titulo](#/sessoes/:titulo).


# Miniatura
Componente React que recebe nome, capa, duração, classificação indicativa e genero e retorna um elemento \<link\>\<\/link\> de um filme que caso seja clicado leva o usuario para a [Página de Filmes](#Pagina-de-Filmes) do filme escolhido

# /filmes
.get() que pesquisa a [filmes-db](#filmes-db) e retorna todos os filmes que tiverem o valor booleano __ativo__ como verdadeiro e retorna os filmes encontrados

# /filmes/:titulo
.get() que pesquisa a [filmes-db](#filmes-db) e retorna o filme que possui o valor __titulo__ igual ao passado na url

# /sessoes/:titulo
.get() que pesquisa todas as sessões da [sessões-disponiveis-db](#sessões-disponiveis-db) e retorna aquelas que possuem o valor __filme__ igual ao titulo passado na url

# filmes-db
Armazena todos os filmes do site guardando as seguintes informações de cada filme
- `titulo` — nome do filme
- `poster_url` — URL da imagem do pôster
- `duracao` — duração total do filme
- `classificacao` — classificação indicativa de Livre até +18
- `genero` — gêneros como comédia, ação e aventura
- `atores` — principais atores do filme
- `diretor` — diretor principal
- `descricao` — sinopse do filme
- `lancamento` — data de lançamento
- `ativo` — define se o filme está disponível no catálogo

# cinemas-db
Armazena todos os cinemas do site guardando as seguintes informações de cada filme
- `nome` - nome do cinema
- `salas total` - numero total de salas que o cinema possui
- `salas mega` - numero de salas mega que o cinema possui

# sessões-disponiveis-db
Conecta as base de dados [filmes-db](#filmes-db) e [cinemas-db](#cinemas-db) ligando filmes a salas especificas do cinema para criar sessões
contem as seguinte informações de cada sessão
- `cinema` - Foreign Key de [cinemas-db](#cinemas-db)
- `sala` - numero da sala da sessão
- `filme` - Foreign Key de [filmes-db](#filmes-db)
- `dia` - o dia da semana em que a sessão está disponivel
- `horario` - qual o horario da sessão especifica
- `3d` - define se a sessão sera 3d
- `mega` - define se a sala da sessão sera mega










