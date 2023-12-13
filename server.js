const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const furnitureRoutes = require('./routes/furnitureRoutes');
const userRoutes = require('./routes/userRoutes')

app.use('/api/furniture', furnitureRoutes);
app.use('/api/users', userRoutes)

app.get('/', () => console.log('Hello from Node'))
mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        app.listen(5000);
        console.log(`server is listening to PORT 5000`);
    })
    .catch((err) => console.log(err))
