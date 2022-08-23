//Para conectarnos a postgresql
const { Pool } = require('pg');

// const exec = require('child_process').exec;
const { exec } = require('child_process');

require("dotenv").config();

var fs = require('fs');

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'admin',
	database: 'picapibet',
	port: '5432'
});


//En esta rama NODEGITBETA probaremos uso de git para hacer push con ENV de heroku
const deTest = async (req, res) => {



res.send("GUser: " + process.env.Guser + " <br><br> GPassword: " + process.env.Gpass);




// CONFIG GH data
exec('git remote add origin https://LFrakie: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@github.com/LFrakie/lfvdocs-generator.git', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log("Construyendo archivo");

   console.log(`stdout:\n\n${stdout}`);
   console.log(`stderr: ${stderr}`);

  }
});





// ## Crear nuevo archivo vdoc 
var fileContent = `<h1> ${req.params.datest} </h1>`;

var docGenerado = req.params.datest;

var filepath = './src/pubdocs/'+docGenerado;

await fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;

    console.log("Archivo " + docGenerado +" Generado con exito!");
    // - Respuesta 
}); 

// CONFIG GH data
exec('echo verificando ruta actual: & pwd', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log("ruta---");

   console.log(`stdout:\n\n${stdout}`);
   console.log(`stderr: ${stderr}`);

  }
});



// git add commit and push
exec('git add . & git commit -m "lfvdoc bot" & git push origin', (err, stdout, stderr) => {
  if (err) {
    //some err occurred
    console.error(err)
  } else {
   // the *entire* stdout and stderr (buffered)
   console.log("Pushing ---");

   console.log(`stdout:\n\n${stdout}`);
   console.log(`stderr: ${stderr}`);

  }
});


// exec('ls', (err, stdout, stderr) => {
//   if (err) {
//     //some err occurred
//     console.error(err)
//   } else {
//    // the *entire* stdout and stderr (buffered)
//    console.log(`stdout:\n\n${stdout}`);
//    console.log(`stderr: ${stderr}`);

//   }
// });




};



const rootHome = async (req, res) => {

        res.send(`
            <h2> Test Branch</h2>
                <input type="text" name="urlvdocn" id="urlvdoc">
                <input type="text" name="namvdocn" id="namvdoc">
  <br>
  <button onclick="toGenerate()">Generar</button>

    <script type='text/javascript'>
        function toGenerate() {
            url = 'https://lfvdocs-generator.herokuapp.com/docgen/' + document.getElementById("urlvdoc").value + '/'+ document.getElementById("urlvdoc").value
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
    getDocgen
     // getUsers,
    // createUser,
    // updateUser,
    // deleteUser
}


// Este contenido nos servirá para rellenar nuestro doc de peso
var extracode = `\n<br>codigo spam :B`

