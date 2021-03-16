import Recipe from '../models/recipeModel.js';

export const getRecipes = async (req, res) => {
  try {
    const postRecipes = await Recipe.find();
    console.log(postRecipes);
    res.status(200).json(postRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newRecipe = new Recipe(body);
  try {
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
