import Category from "../models/Category.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ categories });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};