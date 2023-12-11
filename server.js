const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const furnitureRoutes = require('./routes/furnitureRoutes');

app.use('api/furniture', furnitureRoutes);

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        app.listen(500);
        console.log(`server is listening to PORT 5000`);
    })
    .catch((err) => console.log(err))
