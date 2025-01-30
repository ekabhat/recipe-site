import express from 'express';
import db from '../Database/database.js';

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("homepage!!!");
})

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

app.get('/users/:id/ingredients', (req, res) => {
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
            res.json(result);
        }
    });
});



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
            res.json(result);
        }
    });

});




app.listen(5000, ()=> {
    console.log('server is running port 5000')
})