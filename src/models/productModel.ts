import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        required: true,
    },
    images: {
        type: Array,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
    },
    description: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
    },
})

const Product = mongoose.model("products", ProductSchema)

module.exports = Product