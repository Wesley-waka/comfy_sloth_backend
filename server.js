const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

app.use('api/furniture');

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        app.listen(500);
        console.log(`server is listening to PORT 5000`);
    })
    .catch((err) => console.log(err))
