const express = require('express');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`O servidor está rodando na porta ${port}`);
});

