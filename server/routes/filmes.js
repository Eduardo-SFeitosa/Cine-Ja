const express = require('express');

const route = express.Router();

const { Filmes } = require('../models');

//retorna todos os filmes disponiveis da base de dados
route.get('/', async (request, response) => {
    
    const filmes_disponiveis = await Filmes.findAll({
        where: {
            disponivel: true
        }
    });

    response.json(filmes_disponiveis);
});


//retorna um filme pelo título
route.get('/:titulo', async (request, response) => {

    const { titulo } = request.params;

    const filme = await Filmes.findOne({ where: { titulo } });

    response.json(filme);

});

//cria um novo filme na base de dados utilizando o request
route.post('/', async (request, response) => {
    const novo_filme = request.body;

    await Filmes.create(novo_filme);

    response.json(novo_filme);
});

module.exports = route;