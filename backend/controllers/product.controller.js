import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
// Create Product

export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const files = req.files;

    const uploadPromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products" }, (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            })
            .end(file.buffer);
        })
    );

    const imageUrls = await Promise.all(uploadPromises);

    const product = new Product({
      name,
      price: parseFloat(price),
      description,
      images: imageUrls,
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// // Read All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};


// get single product
export const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).json({ message: "product not found" });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.log("Erro fatching single product");
    res.status(500).json({
      success: false,
      message: "error while fatching product  by id",
    });
  }
};

// Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.images && product.images.length > 0) {
      const deletePromises = product.images.map((imageUrl) => {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        return cloudinary.uploader.destroy(`products/${publicId}`);
      });
      await Promise.all(deletePromises);
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const files = req.files; // Use req.files to access uploaded files

    // Upload new images if provided
    let imageUrls = [];
    if (files && files.length > 0) {
      const uploadPromises = files.map(file => 
        new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'products' }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(file.buffer);
        })
      );

      imageUrls = await Promise.all(uploadPromises);
    }

    // Prepare update data
    const updateData = {
      name,
      price: parseFloat(price),
      description,
      ...(imageUrls.length > 0 && { images: imageUrls }) // Conditionally add images
    };

    // Update product
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Product update error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error updating product', 
      error: error.message 
    });
  }
};


