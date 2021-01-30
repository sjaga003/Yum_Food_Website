import React, { useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadRecipes } from './actions/recipeCardsAction';
import RecipeCard from './components/RecipeCard';
import styled from 'styled-components';
import '@fontsource/prompt';

function App() {
  // const recipeCards = {
  //   recipes: [
  //     {
  //       vegetarian: false,
  //       vegan: false,
  //       glutenFree: true,
  //       dairyFree: true,
  //       veryHealthy: false,
  //       cheap: false,
  //       veryPopular: false,
  //       sustainable: false,
  //       weightWatcherSmartPoints: 15,
  //       gaps: 'no',
  //       lowFodmap: false,
  //       aggregateLikes: 69,
  //       spoonacularScore: 72,
  //       healthScore: 15,
  //       creditsText:
  //         'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
  //       license: 'CC BY 3.0',
  //       sourceName: 'Foodista',
  //       pricePerServing: 215.43,
  //       extendedIngredients: [
  //         {
  //           id: 10036,
  //           aisle: 'Meat',
  //           image: 'bone-in-pork-chop.jpg',
  //           consistency: 'solid',
  //           name: 'bone-in pork chops',
  //           original: '4 bone-in pork chops',
  //           originalString: '4 bone-in pork chops',
  //           originalName: 'bone-in pork chops',
  //           amount: 4,
  //           unit: '',
  //           meta: ['bone-in'],
  //           metaInformation: ['bone-in'],
  //           measures: {
  //             us: { amount: 4, unitShort: '', unitLong: '' },
  //             metric: { amount: 4, unitShort: '', unitLong: '' },
  //           },
  //         },
  //         {
  //           id: 1002046,
  //           aisle: 'Condiments',
  //           image: 'dijon-mustard.jpg',
  //           consistency: 'liquid',
  //           name: 'dijon mustard',
  //           original: '1/4 cup dijon mustard',
  //           originalString: '1/4 cup dijon mustard',
  //           originalName: 'dijon mustard',
  //           amount: 0.25,
  //           unit: 'cup',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.25, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 59.147,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 11215,
  //           aisle: 'Produce',
  //           image: 'garlic.png',
  //           consistency: 'solid',
  //           name: 'garlic',
  //           original: '2 cloves garlic, crushed',
  //           originalString: '2 cloves garlic, crushed',
  //           originalName: 'garlic, crushed',
  //           amount: 2,
  //           unit: 'cloves',
  //           meta: ['crushed'],
  //           metaInformation: ['crushed'],
  //           measures: {
  //             us: { amount: 2, unitShort: 'cloves', unitLong: 'cloves' },
  //             metric: { amount: 2, unitShort: 'cloves', unitLong: 'cloves' },
  //           },
  //         },
  //         {
  //           id: 1002030,
  //           aisle: 'Spices and Seasonings',
  //           image: 'pepper.jpg',
  //           consistency: 'solid',
  //           name: 'ground pepper',
  //           original: '3 teaspoons coarsely ground black pepper',
  //           originalString: '3 teaspoons coarsely ground black pepper',
  //           originalName: 'coarsely ground black pepper',
  //           amount: 3,
  //           unit: 'teaspoons',
  //           meta: ['black'],
  //           metaInformation: ['black'],
  //           measures: {
  //             us: { amount: 3, unitShort: 'tsps', unitLong: 'teaspoons' },
  //             metric: { amount: 3, unitShort: 'tsps', unitLong: 'teaspoons' },
  //           },
  //         },
  //         {
  //           id: 19296,
  //           aisle: 'Nut butters, Jams, and Honey',
  //           image: 'honey.png',
  //           consistency: 'liquid',
  //           name: 'honey',
  //           original: '1/2 cup honey',
  //           originalString: '1/2 cup honey',
  //           originalName: 'honey',
  //           amount: 0.5,
  //           unit: 'cup',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.5, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 118.294,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 9152,
  //           aisle: 'Produce',
  //           image: 'lemon-juice.jpg',
  //           consistency: 'liquid',
  //           name: 'lemon juice',
  //           original: '1/4 cup lemon juice',
  //           originalString: '1/4 cup lemon juice',
  //           originalName: 'lemon juice',
  //           amount: 0.25,
  //           unit: 'cup',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.25, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 59.147,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 16124,
  //           aisle: 'Ethnic Foods;Condiments',
  //           image: 'soy-sauce.jpg',
  //           consistency: 'liquid',
  //           name: 'soy sauce',
  //           original: '1/4 cup soy sauce',
  //           originalString: '1/4 cup soy sauce',
  //           originalName: 'soy sauce',
  //           amount: 0.25,
  //           unit: 'cup',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.25, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 59.147,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //       ],
  //       id: 662535,
  //       title: 'Sweet Mustard BBQ Pork Chops',
  //       readyInMinutes: 45,
  //       servings: 4,
  //       sourceUrl:
  //         'http://www.foodista.com/recipe/WGDGFHFH/sweet-mustard-bbq-pork-chops',
  //       image: 'https://spoonacular.com/recipeImages/662535-556x370.jpg',
  //       imageType: 'jpg',
  //       summary:
  //         'Sweet Mustard BBQ Pork Chops might be just the <b>American</b> recipe you are searching for. This recipe makes 4 servings with <b>445 calories</b>, <b>38g of protein</b>, and <b>16g of fat</b> each. For <b>$2.15 per serving</b>, this recipe <b>covers 23%</b> of your daily requirements of vitamins and minerals. A mixture of pork chops, coarsely ground pepper, soy sauce, and a handful of other ingredients are all it takes to make this recipe so delicious. To use up the honey you could follow this main course with the <a href="https://spoonacular.com/recipes/honey-gingerbread-133051">Honey Gingerbread</a> as a dessert. 68 people were impressed by this recipe. It is a good option if you\'re following a <b>gluten free and dairy free</b> diet. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. It works well as an affordable main course. All things considered, we decided this recipe <b>deserves a spoonacular score of 75%</b>. This score is solid. Try <a href="https://spoonacular.com/recipes/sauted-pork-chops-with-sweet-potato-apples-and-mustard-sauce-185639">Sautéed Pork Chops with Sweet Potato, Apples and Mustard Sauce</a>, <a href="https://spoonacular.com/recipes/pork-chops-with-mustard-17163">Pork Chops With Mustard</a>, and <a href="https://spoonacular.com/recipes/mustard-pork-chops-16834">Mustard Pork Chops</a> for similar recipes.',
  //       cuisines: [],
  //       dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
  //       diets: ['gluten free', 'dairy free'],
  //       occasions: [],
  //       instructions:
  //         '<ol><li>Combine honey, Dijon mustard, lemon juice, soy sauce, and garlic in a bowl. Stir until sugar dissolves.</li><li>Place pork chops in large resealable plastic container or bag. Pour marinade over pork chops; seal bag/container. Refrigerate for at least 4 hours (preferably overnight), shaking container or turning bag occasionally.</li><li>Prepare barbecue (medium-high heat). Sprinkle pork chops with fresh cracked pepper.</li><li>Grill pork chops until instant-read thermometer inserted into center of chops registers 145 F to 150 F, about 5-7 minutes per side, brushing with leftover marinade and moving chops to cooler part of rack if burning.</li><li>Transfer chops to platter; cover with foil, and let stand 5 minutes. Serve.</li></ol>',
  //       analyzedInstructions: [
  //         {
  //           name: '',
  //           steps: [
  //             {
  //               number: 1,
  //               step:
  //                 'Combine honey, Dijon mustard, lemon juice, soy sauce, and garlic in a bowl. Stir until sugar dissolves.',
  //               ingredients: [
  //                 {
  //                   id: 1032046,
  //                   name: 'dijon mustard',
  //                   localizedName: 'dijon mustard',
  //                   image: 'dijon-mustard.jpg',
  //                 },
  //                 {
  //                   id: 9152,
  //                   name: 'lemon juice',
  //                   localizedName: 'lemon juice',
  //                   image: 'lemon-juice.jpg',
  //                 },
  //                 {
  //                   id: 16124,
  //                   name: 'soy sauce',
  //                   localizedName: 'soy sauce',
  //                   image: 'soy-sauce.jpg',
  //                 },
  //                 {
  //                   id: 11215,
  //                   name: 'garlic',
  //                   localizedName: 'garlic',
  //                   image: 'garlic.png',
  //                 },
  //                 {
  //                   id: 19296,
  //                   name: 'honey',
  //                   localizedName: 'honey',
  //                   image: 'honey.png',
  //                 },
  //                 {
  //                   id: 19335,
  //                   name: 'sugar',
  //                   localizedName: 'sugar',
  //                   image: 'sugar-in-bowl.png',
  //                 },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 404783,
  //                   name: 'bowl',
  //                   localizedName: 'bowl',
  //                   image: 'bowl.jpg',
  //                 },
  //               ],
  //             },
  //             {
  //               number: 2,
  //               step:
  //                 'Place pork chops in large resealable plastic container or bag.',
  //               ingredients: [
  //                 {
  //                   id: 10010062,
  //                   name: 'pork chops',
  //                   localizedName: 'pork chops',
  //                   image: 'pork-chops.jpg',
  //                 },
  //               ],
  //               equipment: [],
  //             },
  //             {
  //               number: 3,
  //               step:
  //                 'Pour marinade over pork chops; seal bag/container. Refrigerate for at least 4 hours (preferably overnight), shaking container or turning bag occasionally.Prepare barbecue (medium-high heat).',
  //               ingredients: [
  //                 {
  //                   id: 10010062,
  //                   name: 'pork chops',
  //                   localizedName: 'pork chops',
  //                   image: 'pork-chops.jpg',
  //                 },
  //                 {
  //                   id: 0,
  //                   name: 'marinade',
  //                   localizedName: 'marinade',
  //                   image: 'seasoning.png',
  //                 },
  //               ],
  //               equipment: [],
  //               length: { number: 240, unit: 'minutes' },
  //             },
  //             {
  //               number: 4,
  //               step:
  //                 'Sprinkle pork chops with fresh cracked pepper.Grill pork chops until instant-read thermometer inserted into center of chops registers 145 F to 150 F, about 5-7 minutes per side, brushing with leftover marinade and moving chops to cooler part of rack if burning.',
  //               ingredients: [
  //                 {
  //                   id: 0,
  //                   name: 'cracked pepper',
  //                   localizedName: 'cracked pepper',
  //                   image: 'pepper.jpg',
  //                 },
  //                 {
  //                   id: 10010062,
  //                   name: 'pork chops',
  //                   localizedName: 'pork chops',
  //                   image: 'pork-chops.jpg',
  //                 },
  //                 {
  //                   id: 0,
  //                   name: 'marinade',
  //                   localizedName: 'marinade',
  //                   image: 'seasoning.png',
  //                 },
  //                 { id: 0, name: 'cooler', localizedName: 'cooler', image: '' },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 404789,
  //                   name: 'kitchen thermometer',
  //                   localizedName: 'kitchen thermometer',
  //                   image: 'food-thermometer.jpg',
  //                 },
  //                 {
  //                   id: 404706,
  //                   name: 'grill',
  //                   localizedName: 'grill',
  //                   image: 'grill.jpg',
  //                 },
  //               ],
  //               length: { number: 7, unit: 'minutes' },
  //             },
  //             {
  //               number: 5,
  //               step:
  //                 'Transfer chops to platter; cover with foil, and let stand 5 minutes.',
  //               ingredients: [],
  //               equipment: [
  //                 {
  //                   id: 404765,
  //                   name: 'aluminum foil',
  //                   localizedName: 'aluminum foil',
  //                   image: 'aluminum-foil.png',
  //                 },
  //               ],
  //               length: { number: 5, unit: 'minutes' },
  //             },
  //             { number: 6, step: 'Serve.', ingredients: [], equipment: [] },
  //           ],
  //         },
  //       ],
  //       originalId: null,
  //       spoonacularSourceUrl:
  //         'https://spoonacular.com/sweet-mustard-bbq-pork-chops-662535',
  //     },
  //     {
  //       vegetarian: false,
  //       vegan: false,
  //       glutenFree: false,
  //       dairyFree: false,
  //       veryHealthy: false,
  //       cheap: false,
  //       veryPopular: true,
  //       sustainable: false,
  //       weightWatcherSmartPoints: 29,
  //       gaps: 'no',
  //       lowFodmap: false,
  //       aggregateLikes: 700,
  //       spoonacularScore: 91,
  //       healthScore: 27,
  //       creditsText:
  //         'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
  //       license: 'CC BY 3.0',
  //       sourceName: 'Foodista',
  //       pricePerServing: 745.41,
  //       extendedIngredients: [
  //         {
  //           id: 11143,
  //           aisle: 'Produce',
  //           image: 'celery.jpg',
  //           consistency: 'solid',
  //           name: 'celery',
  //           original: '1/2 cup finely chopped celery',
  //           originalString: '1/2 cup finely chopped celery',
  //           originalName: 'finely chopped celery',
  //           amount: 0.5,
  //           unit: 'cup',
  //           meta: ['finely chopped'],
  //           metaInformation: ['finely chopped'],
  //           measures: {
  //             us: { amount: 0.5, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 118.294,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 18079,
  //           aisle: 'Pasta and Rice',
  //           image: 'breadcrumbs.jpg',
  //           consistency: 'solid',
  //           name: 'dry bread crumbs',
  //           original: '1/3 cup fine dry bread crumbs',
  //           originalString: '1/3 cup fine dry bread crumbs',
  //           originalName: 'fine dry bread crumbs',
  //           amount: 0.3333333333333333,
  //           unit: 'cup',
  //           meta: ['dry', 'fine'],
  //           metaInformation: ['dry', 'fine'],
  //           measures: {
  //             us: { amount: 0.333, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 78.863,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 1123,
  //           aisle: 'Milk, Eggs, Other Dairy',
  //           image: 'egg.png',
  //           consistency: 'solid',
  //           name: 'eggs',
  //           original: '4 Eggs',
  //           originalString: '4 Eggs',
  //           originalName: 'Eggs',
  //           amount: 4,
  //           unit: '',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 4, unitShort: '', unitLong: '' },
  //             metric: { amount: 4, unitShort: '', unitLong: '' },
  //           },
  //         },
  //         {
  //           id: 18439,
  //           aisle: 'Bakery/Bread',
  //           image: 'English-muffins.jpg',
  //           consistency: 'solid',
  //           name: 'english muffins',
  //           original: '3 English Muffins',
  //           originalString: '3 English Muffins',
  //           originalName: 'English Muffins',
  //           amount: 3,
  //           unit: '',
  //           meta: ['english'],
  //           metaInformation: ['english'],
  //           measures: {
  //             us: { amount: 3, unitShort: '', unitLong: '' },
  //             metric: { amount: 3, unitShort: '', unitLong: '' },
  //           },
  //         },
  //         {
  //           id: 93802,
  //           aisle: 'Spices and Seasonings',
  //           image: 'hollandaise-sauce.jpg',
  //           consistency: 'solid',
  //           name: 'hollandaise sauce mix',
  //           original: '1 package Knorr Hollandaise Sauce Mix',
  //           originalString: '1 package Knorr Hollandaise Sauce Mix',
  //           originalName: 'Knorr Hollandaise Sauce Mix',
  //           amount: 1,
  //           unit: 'package',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 1, unitShort: 'pkg', unitLong: 'package' },
  //             metric: { amount: 1, unitShort: 'pkg', unitLong: 'package' },
  //           },
  //         },
  //         {
  //           id: 6168,
  //           aisle: 'Condiments',
  //           image: 'hot-sauce-or-tabasco.png',
  //           consistency: 'liquid',
  //           name: 'hot sauce',
  //           original: '3 drops hot sauce',
  //           originalString: '3 drops hot sauce',
  //           originalName: 'hot sauce',
  //           amount: 3,
  //           unit: 'drops',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 3, unitShort: 'drops', unitLong: 'drops' },
  //             metric: { amount: 3, unitShort: 'drops', unitLong: 'drops' },
  //           },
  //         },
  //         {
  //           id: 10115136,
  //           aisle: 'Seafood',
  //           image: 'lump-crabmeat.png',
  //           consistency: 'solid',
  //           name: 'lump crab meat',
  //           original: '1 pound lump crab meat',
  //           originalString: '1 pound lump crab meat',
  //           originalName: 'lump crab meat',
  //           amount: 1,
  //           unit: 'pound',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 1, unitShort: 'lb', unitLong: 'pound' },
  //             metric: { amount: 453.592, unitShort: 'g', unitLong: 'grams' },
  //           },
  //         },
  //         {
  //           id: 4025,
  //           aisle: 'Condiments',
  //           image: 'mayonnaise.png',
  //           consistency: 'liquid',
  //           name: 'mayonnaise',
  //           original: '1/2 cup mayonnaise',
  //           originalString: '1/2 cup mayonnaise',
  //           originalName: 'mayonnaise',
  //           amount: 0.5,
  //           unit: 'cup',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.5, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 118.294,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 11282,
  //           aisle: 'Produce',
  //           image: 'brown-onion.png',
  //           consistency: 'solid',
  //           name: 'onion',
  //           original: '1/2 cup finely chopped onion',
  //           originalString: '1/2 cup finely chopped onion',
  //           originalName: 'finely chopped onion',
  //           amount: 0.5,
  //           unit: 'cup',
  //           meta: ['finely chopped'],
  //           metaInformation: ['finely chopped'],
  //           measures: {
  //             us: { amount: 0.5, unitShort: 'cups', unitLong: 'cups' },
  //             metric: {
  //               amount: 118.294,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 11297,
  //           aisle: 'Produce;Spices and Seasonings',
  //           image: 'parsley.jpg',
  //           consistency: 'solid',
  //           name: 'parsley',
  //           original: '2 tablespoons minced parsley',
  //           originalString: '2 tablespoons minced parsley',
  //           originalName: 'minced parsley',
  //           amount: 2,
  //           unit: 'tablespoons',
  //           meta: ['minced'],
  //           metaInformation: ['minced'],
  //           measures: {
  //             us: { amount: 2, unitShort: 'Tbsps', unitLong: 'Tbsps' },
  //             metric: { amount: 2, unitShort: 'Tbsps', unitLong: 'Tbsps' },
  //           },
  //         },
  //         {
  //           id: 1032034,
  //           aisle: 'Spices and Seasonings',
  //           image: 'seasoning.jpg',
  //           consistency: 'solid',
  //           name: 'seafood seasoning',
  //           original: '1/2 teaspoon seafood seasoning',
  //           originalString: '1/2 teaspoon seafood seasoning',
  //           originalName: 'seafood seasoning',
  //           amount: 0.5,
  //           unit: 'teaspoon',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.5, unitShort: 'tsps', unitLong: 'teaspoons' },
  //             metric: { amount: 0.5, unitShort: 'tsps', unitLong: 'teaspoons' },
  //           },
  //         },
  //         {
  //           id: 1145,
  //           aisle: 'Milk, Eggs, Other Dairy',
  //           image: 'butter-sliced.jpg',
  //           consistency: 'solid',
  //           name: 'unsalted butter',
  //           original: '6 tablespoons unsalted butter',
  //           originalString: '6 tablespoons unsalted butter',
  //           originalName: 'unsalted butter',
  //           amount: 6,
  //           unit: 'tablespoons',
  //           meta: ['unsalted'],
  //           metaInformation: ['unsalted'],
  //           measures: {
  //             us: { amount: 6, unitShort: 'Tbsps', unitLong: 'Tbsps' },
  //             metric: { amount: 6, unitShort: 'Tbsps', unitLong: 'Tbsps' },
  //           },
  //         },
  //         {
  //           id: 6971,
  //           aisle: 'Condiments',
  //           image: 'dark-sauce.jpg',
  //           consistency: 'liquid',
  //           name: 'worcestershire sauce',
  //           original: '1/2 teaspoon Worcestershire sauce',
  //           originalString: '1/2 teaspoon Worcestershire sauce',
  //           originalName: 'Worcestershire sauce',
  //           amount: 0.5,
  //           unit: 'teaspoon',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 0.5, unitShort: 'tsps', unitLong: 'teaspoons' },
  //             metric: { amount: 0.5, unitShort: 'tsps', unitLong: 'teaspoons' },
  //           },
  //         },
  //       ],
  //       id: 640275,
  //       title: 'Crab Cakes Eggs Benedict',
  //       readyInMinutes: 30,
  //       servings: 3,
  //       sourceUrl:
  //         'http://www.foodista.com/recipe/P53KDVS3/crab-cakes-eggs-benedict',
  //       image: 'https://spoonacular.com/recipeImages/640275-556x370.jpg',
  //       imageType: 'jpg',
  //       summary:
  //         'Crab Cakes Eggs Benedict takes about <b>30 minutes</b> from beginning to end. One portion of this dish contains around <b>42g of protein</b>, <b>59g of fat</b>, and a total of <b>865 calories</b>. For <b>$6.9 per serving</b>, you get a breakfast that serves 3. Several people made this recipe, and 701 would say it hit the spot. This recipe from Foodista requires onion, celery, dry bread crumbs, and english muffins. It is a good option if you\'re following a <b>pescatarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is great. If you like this recipe, take a look at these similar recipes: <a href="https://spoonacular.com/recipes/benedict-crab-cakes-166711">Benedict Crab Cakes</a>, <a href="https://spoonacular.com/recipes/caribbean-crab-cakes-benedict-102381">Caribbean Crab Cakes Benedict</a>, and <a href="https://spoonacular.com/recipes/crab-eggs-benedict-78099">Crab Eggs Benedict</a>.',
  //       cuisines: [],
  //       dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
  //       diets: ['pescatarian'],
  //       occasions: [],
  //       instructions:
  //         '<p>Prepare the crab cakes:</p><ol><li>Cook onion and celery in 4 tablespoons butter over moderately low heat, until tender and transfer to a bowl. Stir in crab and bread crumbs.</li><li>In a small bowl whisk together mayonnaise, seafood seasoning, Worcestershire sauce, hot sauce, parsley, and salt and pepper to taste and stir into crab mixture until combined well.</li><li>Line a baking sheet with wax paper. Form crab mixture into 6 flattened rounds. Chill crab cakes, covered with plastic wrap, at least 1 hour.</li><li>Heat 1 tablespoon butter over moderate heat until foam subsides and cook half of crab cakes until golden brown, about 2 to 3 minutes on each side. Cook remaining cakes in remaining tablespoon butter in same manner.</li></ol><p>Prepare Knorr Hollandaise Sauce according to package instructions.</p><p>Poach the eggs:</p><ol><li>Fill a medium sized sauce pan half way with water. Add 1/2 teaspoon of white vinegar (this is optional but the vinegar helps hold the egg together). Bring to a gentle boil and carefully add eggs (1-2 at a time works best). Poach eggs for 2-3 minutes or until yolk has set to your preference. Remove eggs one at a time with a slotted spoon.</li><li>Assemble: Layer ingredients as follows: English muffin, crab cakes (1 each muffin), eggs, Hollandaise sauce.</li></ol>',
  //       analyzedInstructions: [
  //         {
  //           name: '',
  //           steps: [
  //             {
  //               number: 1,
  //               step:
  //                 'Prepare the crab cakes:Cook onion and celery in 4 tablespoons butter over moderately low heat, until tender and transfer to a bowl. Stir in crab and bread crumbs.In a small bowl whisk together mayonnaise, seafood seasoning, Worcestershire sauce, hot sauce, parsley, and salt and pepper to taste and stir into crab mixture until combined well.Line a baking sheet with wax paper. Form crab mixture into 6 flattened rounds. Chill crab cakes, covered with plastic wrap, at least 1 hour.',
  //               ingredients: [
  //                 {
  //                   id: 6971,
  //                   name: 'worcestershire sauce',
  //                   localizedName: 'worcestershire sauce',
  //                   image: 'dark-sauce.jpg',
  //                 },
  //                 {
  //                   id: 1032034,
  //                   name: 'seafood seasoning',
  //                   localizedName: 'seafood seasoning',
  //                   image: 'seasoning.jpg',
  //                 },
  //                 {
  //                   id: 1102047,
  //                   name: 'salt and pepper',
  //                   localizedName: 'salt and pepper',
  //                   image: 'salt-and-pepper.jpg',
  //                 },
  //                 {
  //                   id: 18079,
  //                   name: 'breadcrumbs',
  //                   localizedName: 'breadcrumbs',
  //                   image: 'breadcrumbs.jpg',
  //                 },
  //                 {
  //                   id: 4025,
  //                   name: 'mayonnaise',
  //                   localizedName: 'mayonnaise',
  //                   image: 'mayonnaise.png',
  //                 },
  //                 {
  //                   id: 6168,
  //                   name: 'hot sauce',
  //                   localizedName: 'hot sauce',
  //                   image: 'hot-sauce-or-tabasco.png',
  //                 },
  //                 {
  //                   id: 11297,
  //                   name: 'parsley',
  //                   localizedName: 'parsley',
  //                   image: 'parsley.jpg',
  //                 },
  //                 {
  //                   id: 1001,
  //                   name: 'butter',
  //                   localizedName: 'butter',
  //                   image: 'butter-sliced.jpg',
  //                 },
  //                 {
  //                   id: 11143,
  //                   name: 'celery',
  //                   localizedName: 'celery',
  //                   image: 'celery.jpg',
  //                 },
  //                 {
  //                   id: 11282,
  //                   name: 'onion',
  //                   localizedName: 'onion',
  //                   image: 'brown-onion.png',
  //                 },
  //                 {
  //                   id: 15136,
  //                   name: 'crab',
  //                   localizedName: 'crab',
  //                   image: 'crabmeat.jpg',
  //                 },
  //                 {
  //                   id: 10018364,
  //                   name: 'wrap',
  //                   localizedName: 'wrap',
  //                   image: 'flour-tortilla.jpg',
  //                 },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 404727,
  //                   name: 'baking sheet',
  //                   localizedName: 'baking sheet',
  //                   image: 'baking-sheet.jpg',
  //                 },
  //                 {
  //                   id: 404730,
  //                   name: 'plastic wrap',
  //                   localizedName: 'plastic wrap',
  //                   image: 'plastic-wrap.jpg',
  //                 },
  //                 {
  //                   id: 404739,
  //                   name: 'wax paper',
  //                   localizedName: 'wax paper',
  //                   image: 'wax-paper.jpg',
  //                 },
  //                 {
  //                   id: 404661,
  //                   name: 'whisk',
  //                   localizedName: 'whisk',
  //                   image: 'whisk.png',
  //                 },
  //                 {
  //                   id: 404783,
  //                   name: 'bowl',
  //                   localizedName: 'bowl',
  //                   image: 'bowl.jpg',
  //                 },
  //               ],
  //               length: { number: 60, unit: 'minutes' },
  //             },
  //             {
  //               number: 2,
  //               step:
  //                 'Heat 1 tablespoon butter over moderate heat until foam subsides and cook half of crab cakes until golden brown, about 2 to 3 minutes on each side. Cook remaining cakes in remaining tablespoon butter in same manner.Prepare Knorr Hollandaise Sauce according to package instructions.Poach the eggs:Fill a medium sized sauce pan half way with water.',
  //               ingredients: [
  //                 {
  //                   id: 93801,
  //                   name: 'hollandaise sauce',
  //                   localizedName: 'hollandaise sauce',
  //                   image: 'hollandaise-sauce.jpg',
  //                 },
  //                 {
  //                   id: 1001,
  //                   name: 'butter',
  //                   localizedName: 'butter',
  //                   image: 'butter-sliced.jpg',
  //                 },
  //                 { id: 0, name: 'sauce', localizedName: 'sauce', image: '' },
  //                 {
  //                   id: 14412,
  //                   name: 'water',
  //                   localizedName: 'water',
  //                   image: 'water.png',
  //                 },
  //                 {
  //                   id: 15136,
  //                   name: 'crab',
  //                   localizedName: 'crab',
  //                   image: 'crabmeat.jpg',
  //                 },
  //                 {
  //                   id: 1123,
  //                   name: 'egg',
  //                   localizedName: 'egg',
  //                   image: 'egg.png',
  //                 },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 404669,
  //                   name: 'sauce pan',
  //                   localizedName: 'sauce pan',
  //                   image: 'sauce-pan.jpg',
  //                 },
  //               ],
  //               length: { number: 2, unit: 'minutes' },
  //             },
  //             {
  //               number: 3,
  //               step:
  //                 'Add 1/2 teaspoon of white vinegar (this is optional but the vinegar helps hold the egg together). Bring to a gentle boil and carefully add eggs (1-2 at a time works best). Poach eggs for 2-3 minutes or until yolk has set to your preference.',
  //               ingredients: [
  //                 {
  //                   id: 2053,
  //                   name: 'distilled white vinegar',
  //                   localizedName: 'distilled white vinegar',
  //                   image: 'vinegar-(white).jpg',
  //                 },
  //                 {
  //                   id: 2053,
  //                   name: 'vinegar',
  //                   localizedName: 'vinegar',
  //                   image: 'vinegar-(white).jpg',
  //                 },
  //                 {
  //                   id: 1123,
  //                   name: 'egg',
  //                   localizedName: 'egg',
  //                   image: 'egg.png',
  //                 },
  //                 {
  //                   id: 1125,
  //                   name: 'egg yolk',
  //                   localizedName: 'egg yolk',
  //                   image: 'egg-yolk.jpg',
  //                 },
  //               ],
  //               equipment: [],
  //               length: { number: 3, unit: 'minutes' },
  //             },
  //           ],
  //         },
  //         {
  //           name: 'Remove eggs one at a time with a slotted spoon.Assemble',
  //           steps: [
  //             {
  //               number: 1,
  //               step:
  //                 'Layer ingredients as follows: English muffin, crab cakes (1 each muffin), eggs, Hollandaise sauce.',
  //               ingredients: [
  //                 {
  //                   id: 93801,
  //                   name: 'hollandaise sauce',
  //                   localizedName: 'hollandaise sauce',
  //                   image: 'hollandaise-sauce.jpg',
  //                 },
  //                 {
  //                   id: 18439,
  //                   name: 'english muffin',
  //                   localizedName: 'english muffin',
  //                   image: 'English-muffins.jpg',
  //                 },
  //                 {
  //                   id: 15136,
  //                   name: 'crab',
  //                   localizedName: 'crab',
  //                   image: 'crabmeat.jpg',
  //                 },
  //                 {
  //                   id: 1123,
  //                   name: 'egg',
  //                   localizedName: 'egg',
  //                   image: 'egg.png',
  //                 },
  //               ],
  //               equipment: [],
  //             },
  //           ],
  //         },
  //       ],
  //       originalId: null,
  //       spoonacularSourceUrl:
  //         'https://spoonacular.com/crab-cakes-eggs-benedict-640275',
  //     },
  //     {
  //       vegetarian: false,
  //       vegan: false,
  //       glutenFree: true,
  //       dairyFree: true,
  //       veryHealthy: false,
  //       cheap: false,
  //       veryPopular: false,
  //       sustainable: false,
  //       weightWatcherSmartPoints: 14,
  //       gaps: 'no',
  //       lowFodmap: true,
  //       aggregateLikes: 8,
  //       spoonacularScore: 87,
  //       healthScore: 45,
  //       creditsText:
  //         'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
  //       license: 'CC BY 3.0',
  //       sourceName: 'Foodista',
  //       pricePerServing: 754.48,
  //       extendedIngredients: [
  //         {
  //           id: 98840,
  //           aisle: 'Produce',
  //           image: 'broccolini.jpg',
  //           consistency: 'solid',
  //           name: 'broccolini',
  //           original: '1 bunch of Broccolini',
  //           originalString: '1 bunch of Broccolini',
  //           originalName: 'Broccolini',
  //           amount: 1,
  //           unit: 'bunch',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 1, unitShort: 'bunch', unitLong: 'bunch' },
  //             metric: { amount: 1, unitShort: 'bunch', unitLong: 'bunch' },
  //           },
  //         },
  //         {
  //           id: 2044,
  //           aisle: 'Produce;Spices and Seasonings',
  //           image: 'basil.jpg',
  //           consistency: 'solid',
  //           name: 'fresh basil',
  //           original: '1 bunch of Fresh Basil',
  //           originalString: '1 bunch of Fresh Basil',
  //           originalName: 'Fresh Basil',
  //           amount: 1,
  //           unit: 'bunch',
  //           meta: ['fresh'],
  //           metaInformation: ['fresh'],
  //           measures: {
  //             us: { amount: 1, unitShort: 'bunch', unitLong: 'bunch' },
  //             metric: { amount: 1, unitShort: 'bunch', unitLong: 'bunch' },
  //           },
  //         },
  //         {
  //           id: 1065062,
  //           aisle: null,
  //           image: 'whole-chicken.jpg',
  //           consistency: 'solid',
  //           name: 'meat',
  //           original:
  //             '12 Thinly sliced Prosciutto or your preferred cured meat',
  //           originalString:
  //             '12 Thinly sliced Prosciutto or your preferred cured meat',
  //           originalName:
  //             'Thinly sliced Prosciutto or your preferred cured meat',
  //           amount: 12,
  //           unit: '',
  //           meta: ['thinly sliced'],
  //           metaInformation: ['thinly sliced'],
  //           measures: {
  //             us: { amount: 12, unitShort: '', unitLong: '' },
  //             metric: { amount: 12, unitShort: '', unitLong: '' },
  //           },
  //         },
  //         {
  //           id: 2069,
  //           aisle: 'Oil, Vinegar, Salad Dressing',
  //           image: 'balsamic-vinegar.jpg',
  //           consistency: 'liquid',
  //           name: 'balsamic vinegar',
  //           original: '1 cup Balsamic Vinegar',
  //           originalString: '1 cup Balsamic Vinegar',
  //           originalName: 'Balsamic Vinegar',
  //           amount: 1,
  //           unit: 'cup',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 1, unitShort: 'cup', unitLong: 'cup' },
  //             metric: {
  //               amount: 236.588,
  //               unitShort: 'ml',
  //               unitLong: 'milliliters',
  //             },
  //           },
  //         },
  //         {
  //           id: 4053,
  //           aisle: 'Oil, Vinegar, Salad Dressing',
  //           image: 'olive-oil.jpg',
  //           consistency: 'liquid',
  //           name: 'olive oil',
  //           original: 'Olive Oil',
  //           originalString: 'Olive Oil',
  //           originalName: 'Olive Oil',
  //           amount: 1,
  //           unit: 'serving',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 1, unitShort: 'serving', unitLong: 'serving' },
  //             metric: { amount: 1, unitShort: 'serving', unitLong: 'serving' },
  //           },
  //         },
  //         {
  //           id: 1102047,
  //           aisle: 'Spices and Seasonings',
  //           image: 'salt-and-pepper.jpg',
  //           consistency: 'solid',
  //           name: 'salt and pepper',
  //           original: 'Salt and Pepper',
  //           originalString: 'Salt and Pepper',
  //           originalName: 'Salt and Pepper',
  //           amount: 1,
  //           unit: 'serving',
  //           meta: [],
  //           metaInformation: [],
  //           measures: {
  //             us: { amount: 1, unitShort: 'serving', unitLong: 'serving' },
  //             metric: { amount: 1, unitShort: 'serving', unitLong: 'serving' },
  //           },
  //         },
  //       ],
  //       id: 657167,
  //       title: 'Prosciutto Wrapped Broccolini With Basil Crisps',
  //       readyInMinutes: 45,
  //       servings: 4,
  //       sourceUrl:
  //         'https://www.foodista.com/recipe/7435XMJZ/prosciutto-wrapped-broccolini-with-basil-crisps',
  //       image: 'https://spoonacular.com/recipeImages/657167-556x370.jpg',
  //       imageType: 'jpg',
  //       summary:
  //         'If you have roughly <b>roughly 45 minutes</b> to spend in the kitchen, Prosciutto Wrapped Broccolini With Basil Crisps might be an awesome <b>gluten free, dairy free, paleolithic, and primal</b> recipe to try. For <b>$7.54 per serving</b>, this recipe <b>covers 40%</b> of your daily requirements of vitamins and minerals. One portion of this dish contains roughly <b>146g of protein</b>, <b>21g of fat</b>, and a total of <b>878 calories</b>. This recipe serves 4. 8 people have tried and liked this recipe. If you have olive oil, basil, salt and pepper, and a few other ingredients on hand, you can make it. It is brought to you by Foodista. With a spoonacular <b>score of 87%</b>, this dish is tremendous. <a href="https://spoonacular.com/recipes/prosciutto-wrapped-shrimp-with-mozzarella-and-basil-149340">Prosciutto-Wrapped Shrimp with Mozzarellan and Basil</a>, <a href="https://spoonacular.com/recipes/pass-the-prosciutto-prosciutto-wrapped-pear-with-parmesan-551304">pass the prosciutto – prosciutto wrapped pear with parmesan</a>, and <a href="https://spoonacular.com/recipes/caramelized-onion-prosciutto-and-broccolini-crustless-quiche-592959">Caramelized Onion, Prosciutto and Broccolini Crustless Quiche</a> are very similar to this recipe.',
  //       cuisines: [],
  //       dishTypes: [],
  //       diets: [
  //         'gluten free',
  //         'dairy free',
  //         'paleolithic',
  //         'primal',
  //         'fodmap friendly',
  //       ],
  //       occasions: [],
  //       instructions:
  //         'Prepare an ice bath. Trim the bottom tip off the broccolini. Bring a large pot of water to a rolling boil. Add a generous amount of salt. Blanch the broccolini for 30 seconds, remove, then submerge into the ice bath. When the broccolini is fully cooled, drain and pat dry with a kitchen towel.\nReduce the balsamic vinegar over medium heat until it becomes 1/4 cup of sticky syrup. Set aside.\nDrop a small handful of basil leaves into the oil. Shield yourself from potential splatter. It only takes one second for the leaves to pop. Immediately fish them from the oil with a strainer and place onto a towel-lined plate. The leaves should become crisp and translucent, but not darkened or it will be bitter.\nHeat up the grill and coat generously with olive oil. Grill the broccolini until slightly charred and softened. Season with salt and pepper.\nWrap the broccolini with prosciutto. Place onto serving platter, drizzle with some extra virgin olive oil and the balsamic reduction.\nGarnish with basil crisps when ready to serve.',
  //       analyzedInstructions: [
  //         {
  //           name: '',
  //           steps: [
  //             {
  //               number: 1,
  //               step:
  //                 'Prepare an ice bath. Trim the bottom tip off the broccolini. Bring a large pot of water to a rolling boil.',
  //               ingredients: [
  //                 {
  //                   id: 98840,
  //                   name: 'broccolini',
  //                   localizedName: 'broccolini',
  //                   image: 'broccolini.jpg',
  //                 },
  //                 {
  //                   id: 14412,
  //                   name: 'water',
  //                   localizedName: 'water',
  //                   image: 'water.png',
  //                 },
  //                 {
  //                   id: 10014412,
  //                   name: 'ice',
  //                   localizedName: 'ice',
  //                   image: 'ice-cubes.png',
  //                 },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 404752,
  //                   name: 'pot',
  //                   localizedName: 'pot',
  //                   image: 'stock-pot.jpg',
  //                 },
  //               ],
  //             },
  //             {
  //               number: 2,
  //               step:
  //                 'Add a generous amount of salt. Blanch the broccolini for 30 seconds, remove, then submerge into the ice bath. When the broccolini is fully cooled, drain and pat dry with a kitchen towel.',
  //               ingredients: [
  //                 {
  //                   id: 98840,
  //                   name: 'broccolini',
  //                   localizedName: 'broccolini',
  //                   image: 'broccolini.jpg',
  //                 },
  //                 {
  //                   id: 2047,
  //                   name: 'salt',
  //                   localizedName: 'salt',
  //                   image: 'salt.jpg',
  //                 },
  //                 {
  //                   id: 10014412,
  //                   name: 'ice',
  //                   localizedName: 'ice',
  //                   image: 'ice-cubes.png',
  //                 },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 221439,
  //                   name: 'kitchen towels',
  //                   localizedName: 'kitchen towels',
  //                   image: 'dish-towel.jpg',
  //                 },
  //               ],
  //             },
  //             {
  //               number: 3,
  //               step:
  //                 'Reduce the balsamic vinegar over medium heat until it becomes 1/4 cup of sticky syrup. Set aside.',
  //               ingredients: [
  //                 {
  //                   id: 2069,
  //                   name: 'balsamic vinegar',
  //                   localizedName: 'balsamic vinegar',
  //                   image: 'balsamic-vinegar.jpg',
  //                 },
  //                 { id: 0, name: 'syrup', localizedName: 'syrup', image: '' },
  //               ],
  //               equipment: [],
  //             },
  //             {
  //               number: 4,
  //               step:
  //                 'Drop a small handful of basil leaves into the oil. Shield yourself from potential splatter. It only takes one second for the leaves to pop. Immediately fish them from the oil with a strainer and place onto a towel-lined plate. The leaves should become crisp and translucent, but not darkened or it will be bitter.',
  //               ingredients: [
  //                 {
  //                   id: 2044,
  //                   name: 'fresh basil',
  //                   localizedName: 'fresh basil',
  //                   image: 'fresh-basil.jpg',
  //                 },
  //                 {
  //                   id: 10115261,
  //                   name: 'fish',
  //                   localizedName: 'fish',
  //                   image: 'fish-fillet.jpg',
  //                 },
  //                 {
  //                   id: 4582,
  //                   name: 'cooking oil',
  //                   localizedName: 'cooking oil',
  //                   image: 'vegetable-oil.jpg',
  //                 },
  //                 { id: 0, name: 'pop', localizedName: 'pop', image: '' },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 405600,
  //                   name: 'sieve',
  //                   localizedName: 'sieve',
  //                   image: 'strainer.png',
  //                 },
  //               ],
  //             },
  //             {
  //               number: 5,
  //               step:
  //                 'Heat up the grill and coat generously with olive oil. Grill the broccolini until slightly charred and softened. Season with salt and pepper.',
  //               ingredients: [
  //                 {
  //                   id: 1102047,
  //                   name: 'salt and pepper',
  //                   localizedName: 'salt and pepper',
  //                   image: 'salt-and-pepper.jpg',
  //                 },
  //                 {
  //                   id: 98840,
  //                   name: 'broccolini',
  //                   localizedName: 'broccolini',
  //                   image: 'broccolini.jpg',
  //                 },
  //                 {
  //                   id: 4053,
  //                   name: 'olive oil',
  //                   localizedName: 'olive oil',
  //                   image: 'olive-oil.jpg',
  //                 },
  //               ],
  //               equipment: [
  //                 {
  //                   id: 404706,
  //                   name: 'grill',
  //                   localizedName: 'grill',
  //                   image: 'grill.jpg',
  //                 },
  //               ],
  //             },
  //             {
  //               number: 6,
  //               step: 'Wrap the broccolini with prosciutto.',
  //               ingredients: [
  //                 {
  //                   id: 98840,
  //                   name: 'broccolini',
  //                   localizedName: 'broccolini',
  //                   image: 'broccolini.jpg',
  //                 },
  //                 {
  //                   id: 10010123,
  //                   name: 'prosciutto',
  //                   localizedName: 'prosciutto',
  //                   image: 'proscuitto.jpg',
  //                 },
  //                 {
  //                   id: 10018364,
  //                   name: 'wrap',
  //                   localizedName: 'wrap',
  //                   image: 'flour-tortilla.jpg',
  //                 },
  //               ],
  //               equipment: [],
  //             },
  //             {
  //               number: 7,
  //               step:
  //                 'Place onto serving platter, drizzle with some extra virgin olive oil and the balsamic reduction.',
  //               ingredients: [
  //                 {
  //                   id: 1034053,
  //                   name: 'extra virgin olive oil',
  //                   localizedName: 'extra virgin olive oil',
  //                   image: 'olive-oil.jpg',
  //                 },
  //                 {
  //                   id: 0,
  //                   name: 'reduction',
  //                   localizedName: 'reduction',
  //                   image: '',
  //                 },
  //               ],
  //               equipment: [],
  //             },
  //             {
  //               number: 8,
  //               step: 'Garnish with basil crisps when ready to serve.',
  //               ingredients: [
  //                 { id: 0, name: 'chips', localizedName: 'chips', image: '' },
  //                 {
  //                   id: 2044,
  //                   name: 'basil',
  //                   localizedName: 'basil',
  //                   image: 'basil.jpg',
  //                 },
  //               ],
  //               equipment: [],
  //             },
  //           ],
  //         },
  //       ],
  //       originalId: null,
  //       spoonacularSourceUrl:
  //         'https://spoonacular.com/prosciutto-wrapped-broccolini-with-basil-crisps-657167',
  //     },
  //   ],
  // };
  const recipeCards = useSelector((state) => state.recipeCards);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="App">
      <button onClick={() => dispatch(loadRecipes(3))}>TEST</button>
      <CardContainer>
        {recipeCards &&
          recipeCards.recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })}
      </CardContainer>
    </div>
  );
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-column-gap: 64px;
  grid-row-gap: 32px;
  justify-content: center;
`;

export default App;
