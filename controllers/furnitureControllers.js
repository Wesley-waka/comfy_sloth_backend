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

const updateProduct = async (req, res) => {
    const { price, featured, color, company, shipping } = req.body

    const furnitureId = req.params.fid;

    let furniture;

    try {
        furniture = await furniture.findOne({ furnitureId });
    } catch (error) {
        throw new Error('Furniture does not exist');
    }

    if (furniture && price) {
        furniture.price = price;
    } else if (furniture && featured) {
        furniture.featured = featured
    } else if (furniture && color) {
        furniture.color = color
    } else if (furniture && company) {
        furniture.company = company
    } else if (furniture && shipping) {
        furniture.shipping = shipping
    }

    try {
        await furniture.save()
    } catch (error) {
        res.status(422);
        throw new Error('Furniture Update Failed,');
    }

    res.status(201).json({ furniture });

}


module.exports = {
    getAllFurniture,
    createFurniture,
    updateProduct
}