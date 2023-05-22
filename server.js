const express = require('express');
const app = express();
const port = 1800;
const userroutes=require('./src/routes')
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.use('/api/user',userroutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });