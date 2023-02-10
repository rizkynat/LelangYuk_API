const controller = require('../controllers/product.controller')

const bodyParser = require('body-parser');
const multer = require('multer')

module.exports = function(app){
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //Configuration for Multer
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, "public");
        },
        filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const filename_without_ext = file.originalname.split(".")[0]
        cb(null, `storage/product/${filename_without_ext}-${Date.now()}.${ext}`);
        },
    });

    // Multer Filter
    const multerFilter = (req, file, cb) => {
        if (file.mimetype.split("/")[1] === "png") {
        cb(null, true);
        } else {
        cb(new Error("Not a PNG File!!"), false);
        }
    };

    //Calling the "multer" Function
    const uploadProduct = multer({
        storage: multerStorage,
        fileFilter: multerFilter,
    });


    app.use(function(res, req, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.post("/api/product/", uploadProduct.single('image_url'), controller.create)
}