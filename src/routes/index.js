const { Router } = require('express');
const router = Router();

// importamos metodo de controllers
const {vdvGenerate, getDocgen, rootHome, deTest, singTest} = require('../controllers/index.controller')

router.get('/', rootHome);


router.get('/singtest', singTest);

router.get('/generate/:titlevd', vdvGenerate);

router.get('/detest/:titlevd', deTest);

router.get('/docgen/:url/:namedoc', getDocgen);



// router.get('/users', getUsers);
// router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

module.exports = router;
