const express = require('express');
const cors = require('cors')

const app = express();

const database = require("./models")

app.get("/filmes", (request, response) => {
    response.json({"filmes" : ["indiana jones", "missão impossivel", "os incriveis"]})
});

app.get("/assentos", (request, response) => {
    response.json({"fileiras" : ["2", "3", "4"]})
});


database.sequelize.sync().then(() => {

    app.listen(process.env.port || 5000, () => {
        console.log("servidor está funcionando")
    });

});


