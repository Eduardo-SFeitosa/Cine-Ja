# Cine Já

Cine Já é uma aplicação full stack que consome uma REST API para informar ao usuário filmes e sessões disponíveis, permitindo a compra de ingressos com seleção de assentos.

Projeto feito utilizando React, Node.js e MySQL.

## Funcionalidades
- Listagem de filmes consumindo uma API REST
- Exibição de pôster, título, duração, gênero e classificação indicativa
- Compra de ingressos com seleção de assentos e geração de pedidos
- Gerenciamento de pedidos e atualização de status de pagamento
- Cadastro, edição e exclusão de usuários
- Criação automática de itinerário de filmes (agendamento)
- Administração: criação de filmes, cinemas e sessões via API
- Componentes reutilizáveis no frontend
- Backend com rotas separadas e operações transacionais
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
- Sequelize (com transações)
- MySQL
- CORS

### Bibliotecas externas
- node-cron (para agendamento de funções)

# Estrutura do projeto

## Front-end
Páginas e componentes auxiliares que a aplicação utiliza para interfaces de usuário.

### Páginas
- [Página Inicial](#pagina-inicial) 
- [Página de Filmes](#pagina-de-filmes) 

### Componentes reutilizáveis
- [Miniatura](#miniatura) 

## Back-end
Rotas das APIs utilizadas pela aplicação.

### APIs
- [/filmes](#/filmes)
- [/filmes/:id](#/filmesid)
- [/sessoes](#/sessoes)
- [/sessoes/:filme_id/:dia](#/sessoesfilme_iddia)
- [/assentos/:sessao_id](#/assentossessao_id)
- [/assentos/:id/:situacao](#/assentosidsituacao)
- [/cinemas](#/cinemas)
- [/cinemas/:nome](#/cinemasnome)
- [/ingressos](#/ingressos)
- [/ingressos/:ingresso_id](#/ingressosingresso_id)
- [/ingressos/usuario/:usuario_id](#/ingressosusuariousuario_id)
- [/pedidos](#/pedidos)
- [/pedidos/:usuario_id](#/pedidosusuario_id)
- [/pedidos/pedido/:pedido_id](#/pedidospedidopedido_id)
- [/pedidos/:pedido_id](#/pedidospedido_id)
- [/usuarios](#/usuarios)
- [/usuarios/:usuario_id](#/usuariosusuario_id)
- [/itinerario](#/itinerario)

## Banco de dados
Tabelas utilizadas para armazenar os dados.

### Tabelas
- [usuarios-db](#usuarios-db) 
- [filmes-db](#filmes-db)
- [cinemas-db](#cinemas-db)
- [sessoes-disponiveis-db](#sessoes-disponiveis-db)
- [assentos-db](#assentos-db)
- [ingressos-db](#ingressos-db)
- [pedidos-db](#pedidos-db)
- [cinema-favorito-db](#cinema-favorito-db)

# pagina-inicial
Página principal do projeto que atua como home page.
Usa um fetch para pesquisar todos os filmes disponíveis e então utiliza [Miniatura](#miniatura) para criar as miniaturas de todos os filmes do catálogo.

# pagina-de-filmes
Uma página específica para um filme que mostra todas as informações do filme usando [/filmes/:id](#/filmesid) e em quais cinemas está disponível e em quais horários usando [/sessoes/:filme_id/:dia](#/sessoesfilme_iddia).

# miniatura
Componente React que recebe nome, capa, duração, classificação indicativa e gênero e retorna um elemento `<link></link>` de um filme que, caso seja clicado, leva o usuário para a [Página de Filmes](#pagina-de-filmes) do filme escolhido.

# /filmes
`GET /` – pesquisa a [filmes-db](#filmes-db) e retorna todos os filmes cadastrados.  
`POST /` – cria um novo filme a partir dos dados enviados no corpo da requisição.

# /filmes/:id
`GET /:id` – pesquisa a [filmes-db](#filmes-db) e retorna o filme cujo **id** é igual ao passado na URL.

# /sessoes
`GET /` – retorna uma lista de filmes em cartaz com informações agregadas das sessões disponíveis.  
`POST /` – cria uma nova sessão com os dados fornecidos.

# /sessoes/:filme_id/:dia
`GET /:filme_id/:dia` – pesquisa a [sessoes-disponiveis-db](#sessoes-disponiveis-db) e retorna todas as sessões que possuem **filme_id** e **dia** iguais aos informados na URL.

# /assentos/:sessao_id
`GET /:sessao_id` – retorna todos os assentos da [assentos-db](#assentos-db) que pertencem à sessão identificada por **sessao_id**.

# /assentos/:id/:situacao
`PUT /:id/:situacao` – modifica a situação de um assento específico (por exemplo, “disponível”, “reservado” ou “vendido”).

# /cinemas
`GET /` – retorna todos os cinemas cadastrados na [cinemas-db](#cinemas-db).  
`POST /` – cria um novo cinema.

# /cinemas/:nome
`GET /:nome` – retorna os dados do cinema cujo **nome** corresponde ao valor passado na URL.

# /ingressos
`POST /` – realiza a compra de ingressos. Recebe os assentos selecionados e os dados da sessão, cria um pedido e os ingressos correspondentes dentro de uma transação. Atualiza a situação dos assentos para “reservado”.

# /ingressos/:ingresso_id
`GET /:ingresso_id` – retorna os detalhes de um ingresso específico.

# /ingressos/usuario/:usuario_id
`GET /usuario/:usuario_id` – retorna todos os ingressos associados a um usuário.

# /pedidos
`POST /` – cria um novo pedido.

# /pedidos/:usuario_id
`GET /:usuario_id` – retorna todos os pedidos de um usuário.

# /pedidos/pedido/:pedido_id
`GET /pedido/:pedido_id` – retorna um pedido específico pelo seu ID (endpoint alternativo).

# /pedidos/:pedido_id
`PUT /:pedido_id` – atualiza o status de um pedido para “pago”, efetivando a compra.

# /usuarios
`POST /` – cria um novo usuário com **usuario** e **senha**.

# /usuarios/:usuario_id
`PUT /:usuario_id` – modifica os dados (nome de usuário e/ou senha) do usuário identificado.  
`DELETE /:usuario_id` – remove o usuário do banco de dados.

# /itinerario
`GET /` – executa uma rotina agendada que cria/atualiza o itinerário de filmes (por exemplo, gerando sessões para a semana).

# usuarios-db
Armazena informações dos usuários da aplicação:
- `id` – identificador único (chave primária)
- `usuario` – nome utilizado para login
- `senha` – senha (armazenada com hash)

**Relacionamentos:**
- Um usuário pode ter vários ingressos (`hasMany` ingresso)
- Um usuário pode ter vários pedidos (`hasMany` pedido)
- Um usuário pode ter vários cinemas favoritos (`hasMany` cinema_favorito)

# filmes-db
Armazena todos os filmes do site:
- `id` – identificador único
- `titulo` – nome do filme
- `poster_url` – URL da imagem do pôster
- `duracao` – duração total do filme
- `classificacao` – classificação indicativa (valor numérico, ex: Livre a +18)
- `genero` – gêneros (ex.: comédia, ação)
- `atores` – principais atores
- `diretor` – diretor principal
- `descricao` – sinopse do filme
- `lancamento` – data de lançamento (tipo `DATEONLY`)

**Relacionamentos:**
- Um filme pode estar em várias sessões (`hasMany` sessoes)
- Um filme pode ter vários ingressos vendidos (`hasMany` ingresso)

# cinemas-db
Armazena os cinemas parceiros:
- `id` – identificador único
- `nome` – nome do cinema
- `localizacao` – endereço ou região
- `salas_total` – número total de salas (tipo `TINYINT`)
- `salas_mega` – número de salas mega (tipo `TINYINT`)

**Relacionamentos:**
- Um cinema pode ter várias sessões (`hasMany` sessoes)
- Um cinema pode ter vários ingressos vendidos (`hasMany` ingresso)
- Um cinema pode ter vários cinemas favoritos (`hasMany` cinema_favorito)

# sessoes-disponiveis-db
Conecta filmes e cinemas, formando as sessões:
- `id` – identificador único
- `sala` – número da sala
- `dia` – dia da sessão (tipo `DATEONLY`)
- `horario` – horário da sessão (tipo `TIME`)
- `sessao_3d` – booleano indicando se a sessão é em 3D
- `sala_mega` – booleano indicando se a sala é mega
- `filme_id` – referência a [filmes-db](#filmes-db)
- `cinema_id` – referência a [cinemas-db](#cinemas-db)

**Relacionamentos:**
- Uma sessão pertence a um filme (`belongsTo` filmes)
- Uma sessão pertence a um cinema (`belongsTo` cinemas)
- Uma sessão possui vários assentos (`hasMany` assentos)

# assentos-db
Armazena os assentos de cada sessão:
- `id` – identificador único
- `local` – localização do assento (ex.: A12, G02)
- `situacao` – estado do assento: “disponível”, “reservado” ou “vendido”
- `sessao_id` – referência a [sessoes-disponiveis-db](#sessoes-disponiveis-db)

**Relacionamentos:**
- Um assento pertence a uma sessão (`belongsTo` sessoes)

# ingressos-db
Registra cada ingresso adquirido:
- `id` – identificador único
- `sala` – número da sala
- `assento` – local do assento escolhido
- `dia` – dia da sessão (tipo `DATEONLY`)
- `horario` – horário da sessão (tipo `TIME`)
- `sessao_3d` – se a sessão é 3D
- `sala_mega` – se a sala é mega
- `situacao` – status do ingresso (“aguardando pagamento”, “pago”, etc.)
- `pedido_id` – referência a [pedidos-db](#pedidos-db)
- `filme_id` – referência a [filmes-db](#filmes-db)
- `cinema_id` – referência a [cinemas-db](#cinemas-db)
- `usuario_id` – referência a [usuarios-db](#usuarios-db)

**Relacionamentos:**
- Um ingresso pertence a um filme, cinema, usuário e pedido (`belongsTo` respectivas tabelas)

# pedidos-db
Agrupa os ingressos de uma compra:
- `id` – identificador único
- `situacao` – status do pedido (“aguardando pagamento”, “pago”, etc.)
- `validade` – data/hora de expiração do pedido (default: 2 horas após criação)
- `usuario_id` – referência a [usuarios-db](#usuarios-db)

**Relacionamentos:**
- Um pedido pertence a um usuário (`belongsTo` usuarios)
- Um pedido pode conter vários ingressos (`hasMany` ingresso)

# cinema-favorito-db
Armazena a relação entre usuários e seus cinemas favoritos:
- `id` – identificador único
- `usuario_id` – referência a [usuarios-db](#usuarios-db)
- `cinema_id` – referência a [cinemas-db](#cinemas-db)

**Relacionamentos:**
- Um registro pertence a um usuário (`belongsTo` usuarios)
- Um registro pertence a um cinema (`belongsTo` cinemas)