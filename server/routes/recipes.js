import express from 'express';
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
} from '../controllers/recipes.js';

const router = express.Router();

router.get('/', getRecipes);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);

export default router;
