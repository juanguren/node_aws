const { Router } = require('express');
const {
  createUser,
  retrieveUsers,
  retrieveUser,
  activateUser,
  deleteUser,
} = require('../controllers/testController');

const testRouter = Router();

testRouter.get('/', retrieveUsers);
testRouter.get('/user/:state', retrieveUser);
testRouter.post('/activate/:id', activateUser);
testRouter.post('/', createUser);
testRouter.delete('/user/:id', deleteUser);

module.exports = testRouter;
