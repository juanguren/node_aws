const { Router } = require('express');

const weatherRouter = Router();

weatherRouter.get('/');

module.exports = weatherRouter;
