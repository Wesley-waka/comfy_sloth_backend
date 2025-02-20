const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const furnitureRoutes = require('./routes/furnitureRoutes');
const userRoutes = require('./routes/userRoutes')
const stripeRoutes = require('./routes/stripeRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const errorHandler = require("./middlewares/errorMiddleware");
const HttpError = require('./models/http-error');

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
        credentials: true,
    })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route.', 404);
//     throw error;
//   });
// Routes MiddleWare
app.use('/api/furniture', furnitureRoutes);
app.use('/api/users', userRoutes)
app.use('/api/payment', stripeRoutes)
app.get('/', (req, res) => res.send('Hello from Node'))


// Error Middleware
app.use(errorHandler);

// DB connection
mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(() => {
        app.listen(5000);
        console.log(`server is listening to PORT 5000`);
    })
    .catch((err) => console.log(err))
