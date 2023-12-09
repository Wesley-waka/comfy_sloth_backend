const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use('api/furniture');

mongoose
    .connect(
        'mongodb+srv://wesleywaka2:wesleywaka2@cluster0.bkzujvd.mongodb.net/Places-app?retryWrites=true&w=majority'
    )
    .then(() => {
        app.listen(500);
        console.log(`server is listening to PORT 5000`);
    })
    .catch((err) => console.log(err))
