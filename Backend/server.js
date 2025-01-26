const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("homepage!!!");
})


app.listen(5000, ()=> {
    console.log('server is running port 5000')
})