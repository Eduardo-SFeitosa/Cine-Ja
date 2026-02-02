const express = require('express');

const route = express.Router()

const { Filmes } = require("../models")


route.get("/assentos", (request, response) => {
    response.json({"fileiras" : ["2", "3", "4"]})
});



module.exports = route;