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
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660560/Comfy-Sloth%20Store/Accent%20Chair/images2_qw8euk.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660559/Comfy-Sloth%20Store/Accent%20Chair/images1_ujbgje.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660507/Comfy-Sloth%20Store/Accent%20Chair/Untitled_ccijp1.jpg",
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
        company: 'marcos',
        description: "Introducing our exquisite Accent Chair collection, where comfort meets style in a perfect fusion. Elevate the charm of your living space with these statement pieces designed to capture attention and provide a luxurious retreat within your home.Crafted with meticulous attention to detail, our Accent Chairs boast a harmonious blend of form and function. The ergonomic design ensures not only a comfortable seating experience but also adds a touch of sophistication to any room. Choose from a variety of styles, each uniquely tailored to complement diverse aesthetics, from contemporary chic to timeless elegance.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Albany Sectional',
        price: 109999,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660616/Comfy-Sloth%20Store/Albany%20Sectional/Untitled_wzse22.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660615/Comfy-Sloth%20Store/Albany%20Sectional/images3_sigrs5.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660615/Comfy-Sloth%20Store/Albany%20Sectional/images5_slpcta.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660615/Comfy-Sloth%20Store/Albany%20Sectional/images_twp9ye.jpg",
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
        company: 'liddy',
        description: "Introducing the Albany Sectional — where contemporary design meets unparalleled comfort for the ultimate lounging experience. Our Albany Sectional Collection is a testament to modern living, offering a harmonious blend of style, functionality, and quality craftsmanship.Crafted with precision and attention to detail, each Albany Sectional is designed to be a centerpiece in your living space. The clean lines and sleek profile seamlessly integrate into various decor styles, from urban chic to minimalist sophistication. Its modular design allows for versatile arrangement, ensuring a perfect fit for your unique space and lifestyle.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Albany Table',
        price: 57899,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660636/Comfy-Sloth%20Store/Albany%20Table/images4_er2t7f.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703661830/Comfy-Sloth%20Store/Albany%20Table/albany-table_ogeyb0.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660634/Comfy-Sloth%20Store/Albany%20Table/images3_xrcpsa.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660634/Comfy-Sloth%20Store/Albany%20Table/images1_sbuszj.jpg",
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
        company: 'ikea',
        description: "The Albany Table marries modern design with functionality. Its clean lines and sturdy construction make it a versatile addition to any dining or workspace, providing a contemporary touch to your everyday gatherings.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Armchair',
        price: 74999,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703661855/Comfy-Sloth%20Store/ArmChair/armchair_mwjsmk.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660638/Comfy-Sloth%20Store/ArmChair/images4_naraeu.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660637/Comfy-Sloth%20Store/ArmChair/images2_ov5jyf.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660636/Comfy-Sloth%20Store/ArmChair/images_plnfm6.jpg",
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
        company: 'caressa',
        description: "Immerse yourself in comfort and style with our Armchair collection. Each piece is carefully designed to offer a perfect balance of support and relaxation, creating a cozy nook for you to unwind and enjoy moments of tranquility.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Dining Table',
        price: 107499,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703661915/Comfy-Sloth%20Store/Dining%20Table/dining-table_ruxubm.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660674/Comfy-Sloth%20Store/Dining%20Table/images_a1q7ji.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660674/Comfy-Sloth%20Store/Dining%20Table/images3_fucsmd.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660675/Comfy-Sloth%20Store/Dining%20Table/images4_wv3wsv.jpg",
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
        company: 'marcos',
        description: "Elevate your dining experience with our exquisite Dining Table. Crafted with precision and attention to detail, this table is more than a piece of furniture; it's a statement of refined taste, fostering a sense of togetherness and sophistication in your dining area.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Emperor Bed',
        price: 277399,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660678/Comfy-Sloth%20Store/Emperor%20Bed/Untitled_s773ep.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660680/Comfy-Sloth%20Store/Emperor%20Bed/Untitled3_fmvqdu.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660679/Comfy-Sloth%20Store/Emperor%20Bed/Untitled2_f3y6gq.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660677/Comfy-Sloth%20Store/Emperor%20Bed/images4_zpz5ia.jpg",
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
        company: 'liddy',
        description: "Introducing the Emperor Bed, where luxury and comfort reign supreme. This bed is not just a place to sleep but a sanctuary for relaxation. With its regal design and sumptuous upholstery, the Emperor Bed transforms your bedroom into a haven of opulence.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Entertainment Center',
        price: 216399,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703661949/Comfy-Sloth%20Store/Entertainment%20Center/entertainment-center_padeeq.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660642/Comfy-Sloth%20Store/Entertainment%20Center/Untitled4_yfwywe.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660641/Comfy-Sloth%20Store/Entertainment%20Center/Untitled3_rmskd7.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660640/Comfy-Sloth%20Store/Entertainment%20Center/Untitled1_xzii8v.jpg",
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
        company: 'ikea',
        description: "Transform your living space into an entertainment hub with our sleek Entertainment Center. This functional and stylish piece is designed to house your media essentials while adding a touch of modern elegance to your home.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'High-Back Bench',
        price: 9399,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660645/Comfy-Sloth%20Store/High-Back%20Bench/Untitled_f2bv6c.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660644/Comfy-Sloth%20Store/High-Back%20Bench/images4_ujpsen.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660643/Comfy-Sloth%20Store/High-Back%20Bench/images1_iw6fpn.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660644/Comfy-Sloth%20Store/High-Back%20Bench/images2_nydlq7.jpg",
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
        company: 'caressa',
        description: "Make a statement with our High-Back Bench, where contemporary design meets ergonomic comfort. This versatile piece is perfect for adding seating to your entryway or creating a stylish focal point in any room.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Leather Chair',
        price: 8399,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703661972/Comfy-Sloth%20Store/Leather%20Chair/leather-chair_jo4z2h.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660684/Comfy-Sloth%20Store/Leather%20Chair/Untitled1_fmb2h0.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660683/Comfy-Sloth%20Store/Leather%20Chair/Untitled_b07uk2.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660682/Comfy-Sloth%20Store/Leather%20Chair/images3_ddivbo.jpg",
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
        company: 'marcos',
        description: "Indulge in the luxurious comfort of our Leather Chair collection. Crafted with precision and upholstered in high-quality leather, these chairs offer a sophisticated and timeless addition to your living space.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Leather Sofa',
        price: 10899,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662013/Comfy-Sloth%20Store/Leather%20Sofa/leather-sofa_nknt8c.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660686/Comfy-Sloth%20Store/Leather%20Sofa/images1_afae1t.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660687/Comfy-Sloth%20Store/Leather%20Sofa/images4_empf9o.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660688/Comfy-Sloth%20Store/Leather%20Sofa/Untitled_xlosli.jpg",
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
        company: 'liddy',
        description: "Experience the epitome of luxury with our Leather Sofa collection. Each sofa is a masterpiece of craftsmanship and design, providing not only a comfortable seating option but also a statement piece that exudes elegance.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Modern Bookshelf',
        price: 14599,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662029/Comfy-Sloth%20Store/Modern%20Bookshelf/modern-bookshelf_fdu0xr.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660648/Comfy-Sloth%20Store/Modern%20Bookshelf/Untitled_wrcmqe.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660649/Comfy-Sloth%20Store/Modern%20Bookshelf/Untitled1_enk1kd.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660647/Comfy-Sloth%20Store/Modern%20Bookshelf/images4_quzrj4.jpg",
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
        company: 'ikea',
        description: "Organize your literary treasures with our Modern Bookshelf. Its sleek design and adjustable shelving make it a functional and aesthetic addition to your home office or living room.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Modern Poster Shelf',
        price: 118799,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662046/Comfy-Sloth%20Store/Modern%20Poster%20Shelf/modern_poster_qbahyj.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660652/Comfy-Sloth%20Store/Modern%20Poster%20Shelf/Untitled1_i8qcl4.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660651/Comfy-Sloth%20Store/Modern%20Poster%20Shelf/Untitled_qzd98o.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660649/Comfy-Sloth%20Store/Modern%20Poster%20Shelf/images3_ixfiek.jpg",
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
        company: 'caressa',
        description: "Showcase your favorite art and memories with our Modern Poster Shelf. Its minimalist design allows you to display posters and artworks in a contemporary and personalized way, adding character to your walls.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Shelf',
        price: 115099,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662072/Comfy-Sloth%20Store/Shelf/shelf_nilfkt.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660692/Comfy-Sloth%20Store/Shelf/Untitled1_kf1quk.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660690/Comfy-Sloth%20Store/Shelf/images4_dkeagg.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660689/Comfy-Sloth%20Store/Shelf/images3_b6sqo2.jpg",
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
        company: 'marcos',
        description: "Our versatile Shelf collection offers the perfect solution for organizing and displaying your belongings. With various sizes and finishes available, these shelves seamlessly integrate into any room, providing both style and practicality.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Simple Chair',
        price: 15099,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662112/Comfy-Sloth%20Store/Simple%20Chair/simple_chair_zba7lc.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660695/Comfy-Sloth%20Store/Simple%20Chair/images4_qka1nc.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660695/Comfy-Sloth%20Store/Simple%20Chair/images3_oy3yv8.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660693/Comfy-Sloth%20Store/Simple%20Chair/images2_bdcbp9.jpg",
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
        company: 'liddy',
        description: "Embrace simplicity with our Simple Chair collection. These chairs are a testament to minimalist design, offering a functional and elegant seating option that effortlessly complements any space.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Sofa Set',
        price: 217099,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662132/Comfy-Sloth%20Store/Sofa%20Set/sofa_set_gecm1x.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660655/Comfy-Sloth%20Store/Sofa%20Set/images4_pgksu3.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660654/Comfy-Sloth%20Store/Sofa%20Set/images3_qpddnr.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660654/Comfy-Sloth%20Store/Sofa%20Set/images2_j1ix4k.jpg",
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
        company: 'ikea',
        description: "Upgrade your living room with our curated Sofa Set collection. Designed for both style and comfort, these sets provide a cohesive and sophisticated look for your entertainment and relaxation needs.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Suede Armchair',
        price: 15299,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662154/Comfy-Sloth%20Store/Suede%20Armchair/suede_arm_chair_tyoews.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660658/Comfy-Sloth%20Store/Suede%20Armchair/Untitled6_yrcsda.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660658/Comfy-Sloth%20Store/Suede%20Armchair/Untitled2_s3s42b.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660656/Comfy-Sloth%20Store/Suede%20Armchair/images4_oo40bj.jpg",
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
        company: 'caressa',
        description: "Immerse yourself in the tactile luxury of our Suede Armchair collection. These chairs offer not only a soft and inviting seating option but also a touch of opulence to enhance your living space.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Utopia Sofa',
        price: 279299,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662193/Comfy-Sloth%20Store/Utopia%20Sofa/utopia_sofa_qmlach.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660699/Comfy-Sloth%20Store/Utopia%20Sofa/Untitled3_g9ude8.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660698/Comfy-Sloth%20Store/Utopia%20Sofa/Untitled1_ofejy0.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660697/Comfy-Sloth%20Store/Utopia%20Sofa/Untitled_ecg2of.jpg",
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
        company: 'marcos',
        description: "Immerse yourself in the perfect blend of comfort and contemporary design with our Utopia Sofa. This piece redefines lounging with its plush cushions, clean lines, and modern aesthetic. Elevate your living space with the ultimate seating experience that seamlessly combines style and relaxation.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Vase Table',
        price: 96299,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660701/Comfy-Sloth%20Store/Vase%20Table/images4_ewymwk.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662214/Comfy-Sloth%20Store/Vase%20Table/vasetable_ociehn.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660702/Comfy-Sloth%20Store/Vase%20Table/Untitled1_smtfuz.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660701/Comfy-Sloth%20Store/Vase%20Table/Untitled_jcqm1z.jpg",
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
        company: 'liddy',
        description: "Introducing the Vase Table, where functionality meets artistic expression. This uniquely designed table adds a touch of sophistication to your space with its vase-inspired base. Crafted to be both a practical surface and a work of art, this table effortlessly merges form and function.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Wooden Bed',
        price: 196299,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662255/Comfy-Sloth%20Store/Wooden%20Bed/woodenBed_kuzzoo.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660663/Comfy-Sloth%20Store/Wooden%20Bed/Untitled_jyq5co.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660662/Comfy-Sloth%20Store/Wooden%20Bed/Untitled3_gbvysp.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660661/Comfy-Sloth%20Store/Wooden%20Bed/Untitled2_tnr2vt.jpg",
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
        company: 'ikea',
        description: "Experience the warmth and timeless appeal of our Wooden Bed. Crafted from high-quality wood, this bed is a statement of natural beauty and durability. Create a cozy retreat in your bedroom with the Wooden Bed, where classic design meets restful serenity.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Wooden Desk',
        price: 156299,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660664/Comfy-Sloth%20Store/Wooden%20Desk/images4_e6hvts.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703662285/Comfy-Sloth%20Store/Wooden%20Desk/wooden_desk_xomgtg.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660664/Comfy-Sloth%20Store/Wooden%20Desk/images3_y6edho.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660665/Comfy-Sloth%20Store/Wooden%20Desk/Untitled_a2nyts.jpg",
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
        company: 'caressa',
        description: "Elevate your workspace with the natural charm of our Wooden Desk. Designed for both style and functionality, this desk provides a sturdy and inviting surface for your work or creative endeavors. Immerse yourself in a productive and aesthetically pleasing environment with the Wooden Desk.",
        shipping: true,
        stockValue: 10
    },
    {
        title: 'Wooden Table',
        price: 246299,
        image: {
            fileName: "product1",
            filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660703/Comfy-Sloth%20Store/Wooden%20Table/images2_f6lzg5.jpg",
            fileType: "image/jpeg",
            fileSize: "80.68kb",
        },
        extra_images: [
            {
                fileName: "product2",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660704/Comfy-Sloth%20Store/Wooden%20Table/images4_tgl3zq.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product3",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660706/Comfy-Sloth%20Store/Wooden%20Table/Untitled1_ylmffv.jpg",
                fileType: "image/jpeg",
                fileSize: "80.68kb",
            },
            {
                fileName: "product4",
                filePath: "https://res.cloudinary.com/dh5j7sg3n/image/upload/v1703660705/Comfy-Sloth%20Store/Wooden%20Table/Untitled_w3zdsa.jpg",
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
        company: 'marcos',
        description: "Discover the rustic elegance of our Wooden Table collection. Whether used as a dining table or a versatile surface for various activities, each table is a celebration of wood's natural beauty. Embrace the simplicity and warmth that our Wooden Tables bring to your home, creating a welcoming space for gatherings and daily activities.",
        shipping: true,
        stockValue: 10
    },
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