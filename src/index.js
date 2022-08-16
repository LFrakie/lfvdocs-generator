const express = require('express');
const app = express();


const port = process.env.PORT || 3000;

//definir middlewares: hace referencia a algunas funciones que se ejecutan antes que lleguen a las rutas
// si en los #routes "rutas" necesitamos procesar un dato antes hay una 
// funcion que ayuda a entender esos datos  

// este metodo cada que recibe un json desde el cliente es 
// capaz de convertirlo a objetos de js de esa manera poderlo manipular en codigo
app.use(express.json());

// este emtodo de express sirve para recepcionar datos de un form
// extended:false - es para solo recibir datos basico excluyendo imagenes.. etc. 
app.use(express.urlencoded({extended: false}));

//definir rutas

app.use(require('./routes/index'));


app.listen(port, () => {
    console.log('Servido en el puerto: ' + port);
})

// app.listen(3000);

// console.log('server on 3000');
