const express = require('express');
const app = express();
const port = 1600;
const userroutes=require('./src/routes')

app.use(express.json());


app.use('/api/user',userroutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });