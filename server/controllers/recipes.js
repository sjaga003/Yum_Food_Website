import mongoose from 'mongoose';
import Recipe from '../models/recipeModel.js';

export const getRecipes = async (req, res) => {
  try {
    const postRecipes = await Recipe.find({ userList: req.userId });
    // console.log(postRecipes);
    res.status(200).json(postRecipes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRecipe = async (req, res) => {
  const body = req.body;
  console.log(body);
  const existingRecipe = await Recipe.findOne({
    recipeObject: body.recipeObject,
  });
  let newRecipe = null;

  if (existingRecipe) {
    newRecipe = existingRecipe;
    console.log('existing recipe');
  } else {
    newRecipe = new Recipe(body);
  }

  try {
    await newRecipe.userList.push(req.userId);
    await newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No recipe with that id');

  await Recipe.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully' });
};
