import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
  recipeObject: Object,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
