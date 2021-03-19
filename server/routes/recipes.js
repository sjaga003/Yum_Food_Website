import express from 'express';
import {
  createRecipe,
  getRecipes,
  deleteRecipe,
} from '../controllers/recipes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getRecipes);
router.post('/', auth, createRecipe);
router.delete('/:id', deleteRecipe);

export default router;
