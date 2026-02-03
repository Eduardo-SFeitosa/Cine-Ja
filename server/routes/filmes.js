const express = require('express');

const route = express.Router()

const { Filmes } = require("../models")

//retorna todos os filmes da base de dados
route.get("/", async (request, response) => {

    const todos_filmes = await Filmes.findAll()
    
    response.json(todos_filmes)
});

//cria um novo filme na base de dados utilizando o request
route.post("/", async (request, response) => {

    const novo_filme = request.body
    
    await Filmes.create(novo_filme)
    
    response.json(novo_filme)

});


module.exports = route;