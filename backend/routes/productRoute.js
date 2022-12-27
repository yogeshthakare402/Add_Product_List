const express = require("express");
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const upload = multer({
    storage: multerStorage,
    // fileFilter: multerFilter,
});

router.get("/", async (req, res) => {
    try {
        console.log("I am in get product");
        console.log(req.body);

        const product = await Product.find()

        res.status(200).json({
            status: "Success",
            product
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

router.post("/", upload.array('items', 5), async (req, res) => {
    try {
        console.log("I am in post product");
        console.log(req.body)
        console.log(req.files)

        const product = await Product.create({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
            uploadImages: req.files
        })


        res.status(200).json({
            status: "Success",
            product
        })
    } catch (error) {
        console.log("post error")
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

router.put("/:id", upload.array('items', 5), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.files)
        console.log("I am in Update product");

        const product = await Product.findOneAndUpdate({ __id: req.id }, {
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            productPrice: req.body.productPrice,
            productCategory: req.body.productCategory,
            uploadImages: req.files
        })

        res.status(200).json({
            status: "Success",
            product
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        // console.log(req.body);
        console.log("I am in Delete product");
        const product = await Product.findOneAndDelete({ __id: req.id });
        // console.log("deleted")

        res.status(200).json({
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

module.exports = router;