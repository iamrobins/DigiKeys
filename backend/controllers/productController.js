import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import fs from "fs";

const productDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId).select("-serialKeys").populate("seller", "name");
    if(!product) {
      res.status(400);
      throw new Error("Product not found");
    } else {
      res.status(200).json(product);
    }
  } catch(error) {
    return next(error);
  }
}

const searchProducts = async (req, res, next) => {
  let reg = new RegExp(req.params.name);
  try {
    const products = await Product.find({ "name" : { $regex: reg, $options: 'i' } })
    .sort({ createdAt: -1 })
    .populate("seller", "name ratings").select("-serialKeys");

    if(products.length === 0) {
      res.status(404);
      throw new Error("No products found");
    }
    res.status(200).json(products);
  }catch(error) {
    return next(error);
  }
}

const displayProducts = async (req, res, next) => {
  try {
    const seller = await User.findOne({name: req.params.name});
    if(!seller) {
      res.status(404);
      throw new Error("User not exists");
    }
    const sellerId = seller._id;
    const products = await Product.find({seller: sellerId});
    if(products.length === 0) {
      res.status(404);
      throw new Error("This seller dont have any products");
    } else {
      res.status(200).json(products);
    }
  }catch(error) {
    return next(error);
  }
}

const createProduct = async (req, res, next) => {
  const {seller, name, category, description, price, image } = req.body;
  console.log(req.body);
  const product = await Product.create({
    seller,
    name,
    image,
    category,
    description,
    price
  });
  res.status(201).json(product);
}

const editProduct = async (req, res, next) => {
  const {name, category, description, price} = req.body;
  const product = await Product.findById(req.params.productId);
  product.name = name;
  product.category = category;
  product.description = description;
  product.price = price;
  if(req.body.image) {
    product.image = req.body.image;
  }
  await product.save();
  res.status(201).json(product);
}

const deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne({_id: req.params.productId});
    res.status(200).json({success: true});
  } catch(error) {
    return next(error);
  }
}

const updateKeys = async (req, res, next) => {
  const {productId, serialKeys} = req.body;
  const product = await Product.findById(productId);
  product.updateKeysAndStock(serialKeys);
  await product.save();
  res.status(200).json(product);
}

export {productDetails ,displayProducts, createProduct, updateKeys, searchProducts, editProduct, deleteProduct};