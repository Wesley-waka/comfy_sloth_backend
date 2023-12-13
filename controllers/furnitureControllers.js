const Furniture = require("../models/furnitureModel");
const { fileSizeFormatter } = require("../utils/fileUpload");

const getAllFurniture = async (req, res) => {
    const furniture = await Furniture.find();

    res
        .status(200)
        .json(furniture)
};

const createFurniture = async (req, res) => {
    const { title, category, description, price, image, featured, color, company, shipping } = req.body

    if (!title || !category || !description || !price || !image || !featured || !color || !company || !shipping || !stockValue) {
        res.status(400);
        throw new Error('Please fill in all entries')
    }

    let fileData = {};

    if (req.file) {
        let uploadedFile;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {
                folder: "Comfy Sloth Store",
                resource_type: "image"
            });
        } catch (error) {
            res.status(500);
            throw new Error("Image could not be found")
        }

        fileData = {
            fileName: req.file.originalName,
            filePath: uploadedFile.secure_url,
            file_type: req.file.mimetype,
            file_size: fileSizeFormatter(req.file.size, 2),
        }
    }

    const createFurniture = new Furniture({
        title: title,
        category: category,
        description: description,
        price: price,
        image: fileData,
        featured: featured,
        color: color,
        company: company,
        shipping: shipping,
        stockValue: stockValue
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

    res.status(201).json(createFurniture);
};

const updateFurniture = async (req, res) => {
    const { price, featured, color, company, shipping, stockValue } = req.body

    const furnitureId = req.params.fid;

    let furniture;

    try {
        furniture = await Furniture.findById(furnitureId);
    } catch (error) {
        res.status(404);
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
    } else if (furniture && shipping) {
        furniture.stockValue = stockValue
    }

    try {
        await furniture.save()
    } catch (error) {
        res.status(422);
        throw new Error('Furniture Update Failed,');
    }

    res.status(201).json(furniture);
};

const findFurniture = async (req, res) => {
    const furnitureId = req.params.fid

    let furniture;

    try {
        furniture = await Furniture.findById(furnitureId);
    } catch (error) {
        res.status(404)
        // throw new Error('Furniture does not exist')
    }

    res.status(200).json(furniture);
}


module.exports = {
    getAllFurniture,
    createFurniture,
    findFurniture,
    updateFurniture
}