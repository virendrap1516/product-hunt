import Product from "../models/Product.js";
import User from "../models/User.js";
import Upvote from "../models/Upvote.js";
import uploadImage from "../utils/cloudinaryHelper.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" })
      .populate("submittedBy", "name email avatar")
      .populate({
        path: "upvotes",
        select: "user createdAt",
        populate: {
          path: "user",
          select: "name avatar",
        },
      })
      .sort({ createdAt: -1 }) // Default sort by latest
      .lean();

    res.status(200).json({
      success: true,
      data: {
        products,
        totalProducts: products.length,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate("submittedBy", "name email avatar bio")
      .populate({
        path: "upvotes",
        select: "user createdAt",
        populate: {
          path: "user",
          select: "name avatar",
        },
      })
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: { product },
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, tagline, description, websiteUrl, category } = req.body;

    if (!name || !tagline || !description || !websiteUrl || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }
    function validateUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (error) {
        throw new Error("Invalid URL format");
      }
    }

    if (!validateUrl(websiteUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid website URL format",
      });
    }
    if (!req.files || !req.files.logo || req.files.logo.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product logo is required",
      });
    }

    if (!req.files.images || req.files.images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    const logoUrl = await uploadImage(req.files.logo[0].path);

    if (!logoUrl) {
      return res.status(500).json({
        success: false,
        message: "Error uploading logo",
      });
    }

    const imageUrls = [];
    for (const image of req.files.images) {
      try {
        const imageUrl = await uploadImage(image.path);
        if (imageUrl) {
          imageUrls.push(imageUrl);
        }
      } catch (uploadError) {
        console.error("Error uploading individual image:", uploadError);
      }
    }

    const product = new Product({
      name,
      tagline,
      description,
      websiteUrl,
      category,
      logo: logoUrl,
      images: imageUrls,
      submittedBy: req.user.id,
    });

    await product.save();

    await product.populate("submittedBy", "name email avatar");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: { product },
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    if (product.submittedBy.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this product",
      });
    }

    // Delete all upvotes associated with this product
    await Upvote.deleteMany({ product: id });

    // Delete the product
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
    });
  }
};

export const toggleUpvote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingUpvote = await Upvote.findOne({
      user: userId,
      product: id,
    });

    let message;
    let isUpvoted;

    if (existingUpvote) {
      await Upvote.findByIdAndDelete(existingUpvote._id);

      await Product.findByIdAndUpdate(id, {
        $inc: { upvoteCount: -1 },
      });

      message = "Upvote removed successfully";
      isUpvoted = false;
    } else {
      await Upvote.create({
        user: userId,
        product: id,
      });

      await Product.findByIdAndUpdate(id, {
        $inc: { upvoteCount: 1 },
      });

      message = "Product upvoted successfully";
      isUpvoted = true;
    }
    res.status(200).json({
      success: true,
      message,
      data: {
        isUpvoted,
      },
    });
  } catch (error) {
    console.error("Toggle upvote error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while toggling upvote",
    });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const products = await Product.find({
      submittedBy: userId,
      status: "approved",
    })
      .populate("submittedBy", "name email avatar")
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({
      success: true,
      data: {
        products,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
          createdAt: user.createdAt,
        },
        totalProducts: products.length,
      },
    });
  } catch (error) {
    console.error("Get user products error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user products",
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = [
      "AI",
      "SaaS",
      "Devtools",
      "Productivity",
      "Design",
      "Marketing",
      "Finance",
      "Education",
      "Health",
      "Gaming",
      "Other",
    ];

    // Get count for each category
    const categoryStats = await Product.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const categoriesWithStats = categories.map((category) => {
      const stat = categoryStats.find((s) => s._id === category);
      return {
        name: category,
        count: stat ? stat.count : 0,
      };
    });

    res.status(200).json({
      success: true,
      data: { categories: categoriesWithStats },
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};

export const getUserUpvotedProducts = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const upvotes = await Upvote.find({ user: userId })
      .populate({
        path: "product",
        match: { status: "approved" },
        populate: {
          path: "submittedBy",
          select: "name email avatar",
        },
      })
      .sort({ createdAt: -1 })
      .lean();

    const upvotedProducts = upvotes
      .filter((upvote) => upvote.product)
      .map((upvote) => upvote.product);

    res.status(200).json({
      success: true,
      data: {
        products: upvotedProducts,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          bio: user.bio,
        },
        totalProducts: upvotedProducts.length,
      },
    });
  } catch (error) {
    console.error("Get user upvoted products error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user upvoted products",
    });
  }
};
