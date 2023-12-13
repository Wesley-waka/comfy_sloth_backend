const mongoose = require('mongoose');
const User = require('../models/userModel');
const Furniture = require('../models/furnitureModel');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const adminData = [
    {
        name: 'Wesley Waka',
        email: 'wesleywaka77@gmail.com',
        password: 'Wesleywaka2003.',
        admin: true
    }
];

const furnitureData = [
    {
        title: 'Accent Chair',
        price: 25999,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1702434217/product-1_axti05.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1702434217/product-1_axti05.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1702434217/product-1_axti05.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1702434217/product-1_axti05.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            }
        ],
        featured: true,
        category: 'office',
        colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff"
        ],
        company: 'Marcos',
        description: "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
        shipping: true,
        stockValue: 10
    }
];

async function seedDatabase() {
    try {
        await User.deleteMany();
        await Furniture.deleteMany();
        const seededData = await User.insertMany(adminData);
        const seededFurniture = await Furniture.insertMany(furnitureData);
        console.log('Database seeded successfully:', seededFurniture);
        console.log('Database seeded successfully:', seededData);
        mongoose.disconnect(); // Move disconnect here in the success case
    } catch (error) {
        console.error('Error seeding DB:', error);
        mongoose.disconnect(); // Move disconnect here in the error case
    }
}

seedDatabase();