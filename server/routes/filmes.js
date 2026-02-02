const express = require('express');

const route = express.Router()

const { Filmes } = require("../models")

route.get("/", async (request, response) => {

    const todos_filmes = await Filmes.findAll()
    
    response.json(todos_filmes)
});

route.post("/", async (request, response) => {

    const novo_filme = request.body
    
    await Filmes.create(novo_filme)
    
    response.json(novo_filme)

});


module.exports = route;