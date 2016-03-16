const express = require('express');
const logger = require('morgan');
const path = require('path');

const _port     = process.argv[2]|| process.env.port||3000;
const app = express();


// serve static files
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})

// turn me on!
app.listen(_port , ()=>
  console.log(`server here! listening on`, _port )
);