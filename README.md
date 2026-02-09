# Cine Já

Cine Já é uma aplicação full stack que consome REST API para informar ao usuario filmes e sessoes disponiveis.

Projeto feito utilizando React, Node.js e MySQL.

## Funcionalidades
- Listagem de filmes consumindo uma API REST
- Exibição de pôster, título, duração, gênero e classificação indicativa
- Sistema de login e usuário
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
- [Página Inicial](#pagina-inicial) 
- [Página de Filmes](#pagina-de-filmes) 

### Componentes reutilizaveis
- [Miniatura](#miniatura) 

## Back-end
Rotas das APIs utilizadas pela aplicação.

### APIs
- [/filmes](#/filmes)
- [/filmes/:titulo](#/filmes/:titulo)
- [/sessoes/:titulo](#/sessoes/:titulo)

## Banco de dados
Tabelas utilizadas para armazenar os dados.

### Tabelas
- [usuarios-db](#usuarios-db) 
- [filmes-db](#filmes-db)
- [cinemas-db](#cinemas-db)
- [sessões-disponiveis-db](#sessões-disponiveis-db)
- [assentos-db](#assentos-db)
- [ingressos-db](#ingressos-db)

# pagina-inicial
Página principal do projeto que atua como home page.
Usa um fetch para pesquisar todos os filmes disponiveis então utiliza [Miniatura](#Miniatura) para criar as miniaturas de todos os filmes do catalogo.

# pagina-de-filmes
Uma página especifica para um filme que mostra todas as informações do filme usando [/filmes/:titulo](#/filmes/:titulo) e em quais cinemas está disponivel e em quais hórarios usando [/sessoes/:titulo](#/sessoes/:titulo).

# miniatura
Componente React que recebe nome, capa, duração, classificação indicativa e genero e retorna um elemento \<link\>\<\/link\> de um filme que caso seja clicado leva o usuario para a [Página de Filmes](#Pagina-de-Filmes) do filme escolhido

# /filmes
.get() que pesquisa a [filmes-db](#filmes-db) e retorna todos os filmes que tiverem o valor booleano __ativo__ como verdadeiro e retorna os filmes encontrados

# /filmes/:titulo
.get() que pesquisa a [filmes-db](#filmes-db) e retorna o filme que possui o valor __titulo__ igual ao passado na url

# /sessoes/:titulo
.get() que pesquisa todas as sessões da [sessões-disponiveis-db](#sessões-disponiveis-db) e retorna aquelas que possuem o valor __filme__ igual ao titulo passado na url

# usuarios-db
É utilizado como Foreign Key na tabela [ingressos-db](#ingressos-db)

Armazena informações sobre usuários da aplicação com as seguintes informações 
- `usuario` - nome utilizado para login do usuário 
- `senha` - senha utilizada para login do usuário 

# filmes-db
É utilizado como Foreign Key nas tabelas [sessões-disponiveis-db](#sessões-disponiveis-db) e [ingressos-db](#ingressos-db)

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
É utilizado como Foreign Key nas tabelas [sessões-disponiveis-db](#sessões-disponiveis-db) e [ingressos-db](#ingressos-db)

Armazena todos os cinemas do site guardando as seguintes informações de cada filme
- `nome` - nome do cinema
- `localizacao` - local onde o cinema se encontra
- `salas total` - número total de salas que o cinema possui
- `salas mega` - número de salas mega que o cinema possui

# sessões-disponiveis-db
É utilizado como Foreign Key na tabela [assentos-db](#assentos-db)

Conecta as base de dados [filmes-db](#filmes-db) e [cinemas-db](#cinemas-db) ligando filmes a salas especificas do cinema para criar sessões
contem as seguinte informações de cada sessão
- `cinema` - Foreign Key de [cinemas-db](#cinemas-db)
- `sala` - numero da sala da sessão
- `filme` - Foreign Key de [filmes-db](#filmes-db)
- `dia` - o dia da semana em que a sessão sera apresentada 
- `horario` - qual o horario da sessão
- `3d` - define se a sessão sera em 3d
- `mega` - define se a sala da sessão sera mega

# assentos-db
Aplicação utiliza a FK __sessao__ para ordenar assentos a suas respectivas sessões

Armazena as informações de cada assento de uma sessão contendo as seguintes informações
- `sessao` - Foreign key de [sessões-disponiveis-db](#sessões-disponiveis-db) 
- `local` - localização do assento na sala utilizando letras A-Z fileiras e números como colunas como A12 e G02
- `situacao` - Informação se o assento está vendido, foi escolhido ou se está disponivel 

# ingressos-db
Armazena os ingressos comprados pelo usuario guardando as seguintes informações
- `usuario` - Foreign Key de [usuarios](#usuarios) que comprou o ingresso
- `cinema` - Foreign Key de [cinemas-db](#cinemas-db)
- `sala` - numero da sala da sessão
- `assento` - assento escolhido pelo usuario
- `filme` - Foreign Key de [filmes-db](#filmes-db)
- `dia` - o dia da semana em que a sessão sera apresentada 
- `horario` - qual o horario da sessão
- `3d` - define se a sessão sera em 3d
- `mega` - define se a sala da sessão sera mega


