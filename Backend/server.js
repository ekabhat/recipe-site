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
    const sql = `SELECT users.id, users.email, users.createdAt, Ingredients.id, Ingredients.name, Ingredients.createdAt 
    FROM User
    LEFT JOIN UserIngredients ON users.id = UserIngredients.user_id
    LEFT JOIN users ON UserIngredients.user_id = users.id
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
    const sql = `SELECT Recipes.id, Recipes.title, Recipes.instructions, Recipes.createdAt, Ingredients.id, Ingredients.name, Ingredients.createdAt
    FROM Recipes
    LEFT JOIN RecipeIngredients ON RecipeIngredients.recipe_id = Recipes.id
    LEFT JOIN Ingredients ON RecipeIngredients.ingredient_id = Ingredients.id
    WHERE RecipeIngredients.recipe_id = ?`

    db.query('sql', [req.params.id], (err, result) => {
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