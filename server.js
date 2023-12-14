const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const furnitureRoutes = require('./routes/furnitureRoutes');
const userRoutes = require('./routes/userRoutes')
const stripeRoutes = require('./routes/stripeRoutes');
const cookieParser = require('cookie-parser');
const stripe = require('stripe')(process.env.STRIPE_KEY)
const { v4: uuidv4 } = require('uuid');

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "https://pinvent-app.vercel.app"],
        credentials: true,
    })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes MiddleWare
app.use('/api/furniture', furnitureRoutes);
app.use('/api/users', userRoutes)
app.use('/api/pay', stripeRoutes)
app.get('/', () => console.log('Hello from Node'))

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
