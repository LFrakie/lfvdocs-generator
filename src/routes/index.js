const { Router } = require('express');
const router = Router();

// importamos metodo de controllers
const { getUserById, rootHome } = require('../controllers/index.controller')

router.get('/', rootHome);

router.get('/users', getUsers);
router.get('/users/:url/:namedoc', getUserById);

router.post('/users', createUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

module.exports = router;
