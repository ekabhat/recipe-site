import express from 'express';
import db from '../Database/database.js';

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("homepage!!!");
})


//add images field to recipes
app.get('/recipes', (req, res) => {
    db.query('SELECT * FROM Recipes', (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err);
            res.status(500).send('Database query failed');
        } else {
            res.json(results);
        }
    });
});



app.get('/users/:id', (req, res) => {
    const sql = `SELECT users.id AS user_id, users.email, users.created_at AS user_createdAt, 
    Ingredients.id AS ingredient_id, Ingredients.name, Ingredients.created_at AS ingredient_createdAt 
    FROM users
    LEFT JOIN UserIngredients ON users.id = UserIngredients.user_id
    LEFT JOIN Ingredients ON UserIngredients.ingredient_id = Ingredients.id
    WHERE UserIngredients.user_id = ? `
    
    db.query(sql , [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching recipe:', err);
            res.status(500).send('Database query failed');
        } else {
            const user = {};
            user.email = result[0].email;
            user.recipe_createdAt = result[0].user_createdAt;
            user.ingredients = [];
            user.ingredients_id = [];

            result.forEach(row => {
                user.ingredients.push(row.name);
                user.ingredients_id.push(row.ingredient_id);
            });

            res.json(user);
        }
    });
});


//fix this. add quantity in ingredients array using each ingredient as objects instead
//add unit field to RecipeIngredients table
app.get('/recipes/:id', (req, res) => {
    const sql = `SELECT Recipes.id AS recipe_id, Recipes.title, Recipes.instructions, Recipes.created_at AS recipe_createdAt, 
    Ingredients.id AS ingredient_id, Ingredients.name, Ingredients.created_at AS ingredient_createdAt
    FROM Recipes
    LEFT JOIN RecipeIngredients ON RecipeIngredients.recipe_id = Recipes.id
    LEFT JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.id
    WHERE RecipeIngredients.recipe_id = ?`

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error fetching recipe:', err);
            res.status(500).send('Database query failed');
        } else {

            //parsing result
            const recipe = {};

            //static recipe info
            recipe.recipe_id = result[0].recipe_id;
            recipe.recipe_name = result[0].title;
            recipe.recipe_createdAt = result[0].recipe_createdAt;
            recipe.recipe_instructions = result[0].instructions;
            recipe.ingredients_name = [];
            recipe.ingredients_id = [];


            //storing each ingredient
            result.forEach(row => {
                recipe.ingredients.push(row.name);
                recipe.ingredients_id.push(row.ingredient_id);
            });

            //response to client
            res.json(recipe);
        }
    });

});

app.use((req, res) => {
    res.status(404)
    res.send("404 Page Not Found :(");
});


app.listen(5000, ()=> {
    console.log('server is running port 5000')
})