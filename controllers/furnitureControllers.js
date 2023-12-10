const Furniture = require("../models/furnitureModel")

const getAllFurniture = async (req, res) => {
    const furnitures = await Furniture.find();
    res
        .json(200)
        .status({ furnitures })
}

const createFurniture = async (req, res) => {
    const { title, category, description, price, image, featured, color, company, shipping } = req.body

    if (!title || !category || !description || !price || !image || !featured || !color || !company || !shipping) {
        res.status(400);
        throw new Error('Please fill in all entries')
    }

    const createFurniture = new Furniture({
        title: title,
        category: category,
        description: description,
        price: price,
        image: image,
        featured: featured,
        color: color,
        company: company,
        shipping: shipping
    })

    try {
        await createFurniture.save();
    } catch (error) {
        res.status(400);
        throw new Error('Creating new Furniture Failed,please try again later')
    }

    // Check if Furniture exists 
    const findFurniture = await Furniture.findOne({ title });
    if (findFurniture) {
        throw new Error('Furniture already exists');
    }

    res.status(201).json({ createFurniture });
}


module.exports = {
    getAllFurniture,
    createFurniture
}