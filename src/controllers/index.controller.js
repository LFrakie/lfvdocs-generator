//Para conectarnos a postgresql
const { Pool } = require('pg');

var fs = require('fs');

const pool = new Pool({
	host: 'localhost',
	user: 'postgres',
	password: 'admin',
	database: 'picapibet',
	port: '5432'
});




const rootHome = async (req, res) => {

        res.send(`
                <input type="text" placeholder="URL de document" name="urlvdocn" id="urlvdoc"><br>
                <input type="text" placeholder="NOMBRE de document" name="namvdocn" id="namvdoc">
  <br>
  <button onclick="toGenerate()">Generar</button>

    <script type='text/javascript'>
        function toGenerate() {
            url = 'https://lfvdocs-generator.herokuapp.com/users/' + document.getElementById("urlvdoc").value + '/' + document.getElementById("namvdoc").value
            window.open(url, '_self');
        }
</script>
`);





// Solo imprime en consola los datos
    // console.log(response.rows);
    // res.send('users');
};


const getUsers = async (req, res) => {

	const response = await pool.query('SELECT * FROM users');
	res.status(200).json(response.rows);

  // const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
  // res.download(file); // Set disposition and send it.    



        // res.send(`<h1> Users </h1>
        //     <p>Hola worldo</p>
        //     <strong>strong</strong>
        //     `);


// Solo imprime en consola los datos
	// console.log(response.rows);
	// res.send('users');
};




const getUserById = async (req, res) => {

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

var filepath = docGenerado +".htm";

await fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;

    console.log("Archivo Generado con exito!");
    // - Respuesta 
    res.download('./'+ filepath);
}); 
// END -- Crear nuevo archivo vdoc ---



// ## Elimina Archivos creados despues de la descarga 
const timeDelteFile = setTimeout(deleteFileGen, 5000);

function deleteFileGen() {

      // unlink = Delete example_file.txt
fs.unlink(filepath, (err => {
  if (err) console.log(err);
  else {
    console.log("\nArchivo temporal Eliminado: " + filepath);

  }
}));

}




    // const vdocbase = (`<h1> Parametros </h1>
    //         <strong>Nombre de Doc es:</strong>
    //         <p>${req.params.namedoc}</p>
    //         <br>
    //         <strong>La url es:</strong><br>
    //         <a href="https://lfvdoc.github.io/${req.params.url}">${req.params.url}</a>
    //         `);

    // const archivo = new Blob([vdocbase], { type: 'text/html' });

    // res.send(vdocbase);




};


// const getUserById = async (req, res) => {
//     const id = parseInt(req.params.id);
//     const response = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
//     res.json(response.rows);
// };




const createUser = async (req, res) => {
const { name, email } = req.body;

const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
console.log(response);
res.json({
	message: 'User added Succesfully',
	body: {
		user: {name, email}
	}
})
	// para testeo rapido 
	// console.log(req.body); //req.body son los dato clientes que nos enviaran
	// res.send('user created'); 
};


const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const response =await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name,
        email,
        id
    ]);
    res.json('User Updated Successfully');
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};



module.exports = {
    rootHome,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}


// Este contenido nos servirá para rellenar nuestro doc de peso
var extracode = `\n<br>codigo spam :B`

