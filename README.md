# Yum

![GIF](media/YumFoodWebsite.gif)

Yum provides users with easy to access recipes with a simple and responsive design. It is built as a full stack application and uses the MERN (MongoDB, Express, React, Node) with full user authentication, guest accounts, and database access. View the live site [here](https://cranky-bhabha-60b7b6.netlify.app/)!

## Overview

Yum is built around the idea that existing recipe websites had cumbersome UIs to navigate and save recipes. It pulls recipe data from the [Spoonacular API](https://spoonacular.com/food-api) and in order to populate the recipe cards and search engine.

## How I built It

Technologies Used:

- React
- React Redux
- React Router
- Styled Components
- Framer Motion
- Recharts
- React Testing Library
- Node
- Express
- JsonWebToken
- MongoDB

In terms of hosting, I used [Netlify](https://www.netlify.com/) for the client side and [Heroku](https://www.heroku.com/) for the server.

## Breakdown of Project

### How To Section Animation

The [How To Section](client/src/components/MainPage/HowToAnimation/HowToSection.js) makes use of CSS animation to create an informational panel. This panel changes depending on if the user is in mobile, as the action it is depicting (drag and drop) is a feature only supported on mobile. The way that the animation was achieved was by using `@keyframes` CSS property and setting the transitions to 10s. This allowed me to align different animations to start at various percentages of `0% - 100%` which would directly correspond to what time the element would animate. By doing this I could then lower the time to whatever I needed and the percentages would adjust accordingly.

### Carousel Quicksearch

This carousel was created from scratch, using the Framer Motion's drag property. A majority of the work done on it was vector math to calculate where the user's mouse was dragging, as well as what card is closest to the center so that it can be 'highlighted'. In addition to dragging, it also has the ability to be moved through the buttons on the top right which cycles through all the card options. The dragging also works on mobile. Because of the math needed to calculate the drag position, it needs to stay a constant size, and cannot be changed with media queries.

### Contact Form

The contact form backend is powered by Netlify. All user's messages through the contact form will be sent to me in an email or view in Netlify's dashboard. The only form of validation for this form is the required fields, and validation on the email field.

### Navigation Bar

The nav is dynamic in that it will appear or disappear depending on which way the user is scrolling. This was done with pure Javascript as it simply calculates the coordinates of your previous scroll compared to the current scroll. In mobile view, the navigation bar will collapse to a burger nav, which should be easier for mobile users to use.

### User Authentication

This site features full user authentication using a custom system with JSON web tokens as well as google OAuth. Users type in their email and password and are able to log in to view their saved recipes. When signing up their password is hashed using the Bcrypt library and the hash is saved in the database. Some features of the site like the My Recipes view and the recipe sidebar cannot be accessed without logging in first.

### Database Structure

For this project, I used MongoDB due to its excellent free tier account, and its ease of use by using the `mongoose` library. The database is structured into 2 models, the first being the user model which stores the users name, email, and password. The second model is the recipe model which stores a list of recipes and corresponding users that have saved this recipe. A recipe object is added when anyone adds a certain recipe to their recipe list (cookbook). That recipe database object is then populated with the user that added the recipe, and any other users who add the same recipe will just be appended to that user list. By doing this, I am not storing multiple copies of the larger recipe object. After the initial addition of the recipe, I only need to worry about adding users to that object.

### Recipe Cards

The recipe cards make use of Framer Motion's drag property and layout property to create a custom drag and drop system. The [Recipes](client/src/components/Recipes.js) component mutates and changes the itself depending on the location the user is currently at. This way I am able to create extremely reusable code in the recipe card and only make small tweaks to fit if it is a recipe card, search card, or cookbook card. The drag and drop system makes use of `dragConstraints` to make the cards snap back into place, and `onDragStart`, `onDrag`, and `onDragEnd` to calculate where the user is dragging the card. If the user drags the card within range of the cookbook sidebar, it will open and when it is dropped, convert to a cookbook card. By using the layout property and `AnimateSharedLayout` the card transforms from the recipe card to the cookbook card.

### My Recipes Sidebar (Cookbook Sidebar)

The cookbook sidebar works hand in hand with the recipe cards and essentially is a receiver of data from the recipe card. When a card is dragged on top of the sidebar, its data is sent to the database and `addToCookBook` is called. Due to the time it takes to access the database, a dummy value is sent to the cookBook redux state which allows for the UI to update properly and is populated after half a second with the correct database value.

### Recipe Detail

When clicking on a recipe card, the recipe detail opens displaying the image of the card and various data pulled from the [Spoonacular API](https://spoonacular.com/food-api). The ingredient cards are generated by looking at two different data points of the recipe and is can be modified depending on the serving size. The instructions are also pulled from the `analyzedInstructions` data point from the recipe API response. The nutrition charts at the bottom of the detail are created using Recharts, populated by extracting the nutrition data from the API, and reducing the data to be usable in the graph views.

### Search

The search bar accesses the Recipe API to pull a list of cards matching the query. The search page makes use of infinite scrolling to only access 20 results at a time so that the size of the requests do not get too large. It will keep allowing the user to scroll until all the search responses have been displayed. In addition, quick access buttons have been included to make it easy to search something quickly. This page makes use of the `useLocation` react router hook to populate the query in the search bar for easy access. The search selection can also be sorted, which is handled by the API in returning responses in a certain order.

### My Recipes (CookBook)

The My Recipes Page is only accessible when a user is logged in. When it loads the recipes from the database, the user is able to sort the recipes they have saved. This, unlike the search page does not require database access each sort. Instead the existing redux state is simply sorted which is apparent when looking at how the cards move.

### Image Masking

A majority of the images on the landing page of this project use CSS Image masking, which involves overlaying an SVG image on the image to create a cutout effect. An example of this can be seen in the welcome [Welcome Page](client/src/components/MainPage/Welcome.js) for a stylistic effect.

### SVG Backgrounds

For the landing page, the background is an SVG that spans the body element. Because of this on mobile, some of the backgrounds needed to be changed to `linear-gradient` in order to create the same effect without needing to adjust the positioning of the background.

### Backend

The backend has a standard folder structure with Controllers, Models, and Routes. The special addition for this project is the Middleware which ensures that the user is logged in before continuing with any requests. If the user is not logged in, an error code is sent back to the client.

### Testing

I used the `react-testing-library` along with `jest` to do unit and integration testing on all components. In the case of the nutrition graphs, I used snapshot testing as the SVG graphs are a bit harder to test.

## Inspiration

The design for this site took inspiration from:

- [Landing Boys - Food and Recipes](https://dribbble.com/shots/10986425-Landing-Boys-Food-and-Recipes)
- [Landing Boys - Food and Restaurant](https://dribbble.com/shots/10986383-Landing-Boys-Food-and-Restaurant)

## Future Developments

In the future I hope to provide more features to signed in users like liking recipes directly from this page, or having an ingredients check off feature in the Recipe Details. In addition in terms of hosting, I hope to move away from heroku as it takes some time for the backend to spin up when users are authenticating for the first time.
