//En esta rama usaremos acios y base 64 para subir archivos a github 

var axios = require('axios');
require("dotenv").config();
var fs = require('fs');
var base64 = require('base-64');
var moment = require('moment');


const deTest = async (req, res) => {
res.send("For Test ");
};

const singTest = async (req, res) => {
res.send("For single Test ");
};




const vdvGenerate = async (req, res) => {

// res.send("GUser: " + process.env.Guser + " <br><br> GPassword: " + process.env.Gpass);

res.send(`VDV Generandose:  <h3> ${req.params.titlevd}</h3>
<br>
<br>
 vista previa: <a href="https://lfvdoc.github.io/${req.params.titlevd}">https://lfvdoc.github.io/${req.params.titlevd}</a>
<br>
<br>
 HOME: <a href="https://lfvdoc.github.io/">https://lfvdoc.github.io/</a>


    `);

// ## Crear nuevo archivo vdoc 
var fileContent = `---
image: "/uploads/docs-icon.jpg"
author: varbot
layout: vdoc
title: ${req.params.titlevd}
url_or_doc: true
sur-doc: ''
sur: https://lfvdocs-generator.herokuapp.com/
categories:
- nodeapi
tags: []

---`;


var getdate = moment().format('YYYY-MM-DD-');

var docGenerado = getdate + req.params.titlevd + ".md";

var filepath = './src/pubdocs/'+docGenerado;

await fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;

    console.log("Archivo " + docGenerado +" Generado con exito!");
    // - Respuesta 
}); 


// AQUI TENEMOS FUNCIONES ANIDADAS
// ## Crear arch base64 con tiempo
const timeb64gen = setTimeout(toBaseConvert, 1000);

function toBaseConvert() {

let file = fs.readFileSync(filepath).toString();
console.log(file);

var content = base64.encode(file);
console.log(content);


// START uploadFileApi
const pushToGit = setTimeout(pushDoc, 2000);

function pushDoc() {

console.log("============== Enviando GH API");

let token = process.env.Gpass;

uploadFileApi(token, content)



function uploadFileApi(token, content) {

    var data = JSON.stringify({
        "message": "txt file from nodev2",
        "content": `${content}`
    });

    var config = {
        method: 'put',
        url: `https://api.github.com/repos/lfvdoc/lfvdoc.github.io/contents/_posts/${docGenerado}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
 });
} // END uploadFileApi

} // END pushDoc

}

// AQUI TERMINA LAS FUNCIONES ANIDADAS


};

























const rootHome = async (req, res) => {


        res.send(`
            <h2> LFvdoc View Generator </h2>
                <input type="text" name="urlvdocn" id="vdocname" placeholder="Doc Name">
  <br>
  <br>
  <button onclick="toGenerate()">Generar</button>

  <br>
  <br>
  <br>
  <br>

<footer> Test Branch - nodeapigit 2022</footer>

    <script type='text/javascript'>
        function toGenerate() {
            url = '/generate/' + document.getElementById("vdocname").value
            window.open(url, '_self');
        }
</script>
        
`);

};



















const getDocgen = async (req, res) => {

// ## Crear nuevo archivo vdoc 
var fileContent = `<h1> Parametros </h1>
<strong>Nombre de Doc es:</strong>
<p>${req.params.namedoc}</p>
<br>
<strong>La url es:</strong><br>
<a href="https://lfvdoc.github.io/${req.params.url}">${req.params.url}</a>
` 
+ extracode;


var docGenerado = req.params.namedoc;

var filepath = './src/pubdocs/'+docGenerado;

// Este agrega extension- que lo quitamos por el comando wget no descarga con extension correcta
// var filepath = docGenerado +".htm";

await fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;

    console.log("Archivo " + docGenerado +" Generado con exito!");
    // - Respuesta 
    res.download(filepath);
}); 
// END -- Crear nuevo archivo vdoc ---


// ## Elimina Archivos creados despues de la descarga 600000 = 10 minutos
const timeDelteFile = setTimeout(deleteFileGen, 600000);

function deleteFileGen() {

      // unlink = Delete example_file.txt
fs.unlink(filepath, (err => {
  if (err) console.log(err);
  else {
    console.log("\nArchivo temporal Eliminado: " + filepath);
  }
}));
}
};

















// const getUserById = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     res.json(response.rows);
// };







// const createUser = async (req, res) => {
// const { name, email } = req.body;

// const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
// console.log(response);
// res.json({
// 	message: 'User added Succesfully',
// 	body: {
// 		user: {name, email}
// 	}
// })
// 	// para testeo rapido 
// 	// console.log(req.body); //req.body son los dato clientes que nos enviaran
// 	// res.send('user created'); 
// };






// const updateUser = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name, email } = req.body;

//     const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
//         name,
//         email,
//         id
//     ]);
//     res.json('User Updated Successfully');
// };








// const deleteUser = async (req, res) => {
//     const id = parseInt(req.params.id);
//     await pool.query('DELETE FROM users where id = $1', [
//         id
//     ]);
//     res.json(`User ${id} deleted Successfully`);
// };



module.exports = {
    rootHome,
    deTest,
    singTest,
    getDocgen,
    vdvGenerate
     // getUsers,
    // createUser,
    // updateUser,
    // deleteUser
}


// Este contenido nos servirá para rellenar nuestro doc de peso
var extracode = `\n<br>codigo spam :B`

