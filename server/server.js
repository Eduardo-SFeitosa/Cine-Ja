const express = require('express');
const cors = require('cors')

const app = express();

const database = require("./models")

const filmes_rout = require("./routes/filmes")


//Quando receber /filmes utiliza o codigo do routes/filmes
app.use("/filmes", filmes_rout);


//inicializa a base de dados mysql quando o servidor começa o listen
database.sequelize.sync().then(() => {


    //cria o servidor no localhost://5000
    app.listen(process.env.port || 5000, () => {
        console.log("servidor está funcionando")
    });

});


