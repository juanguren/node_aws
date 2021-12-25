const express = require('express');
const morgan = require('morgan');
const testRouter = require('./routes/various');
const weatherRouter = require('./routes/weather');

const PORT = 5000 || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Healthy' });
});

app.use('/tests', testRouter);
app.use('/weather', weatherRouter);

app.listen(PORT, () => {
  console.log('Listening in port ' + PORT);
});
