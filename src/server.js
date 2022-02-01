const express = require('express');
const morgan = require('morgan');
const testRouter = require('./routes/various');

const PORT = 5000 || 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Healthy' });
});

app.use('/tests', testRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Check your param route' });
});

app.listen(PORT, () => {
  console.log('Listening in port ' + PORT);
});

module.exports = app;
