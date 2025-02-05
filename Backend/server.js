import express from 'express';
import pool from '../Database/database.js';

const app = express();
app.use(express.json());

app.get("/", (req,res) => {
    res.send("homepage!!!");
})


app.get('/recipes', async (req, res) => {
    try{
        const [results] = await pool.query('SELECT * FROM Recipes');
        res.json(results);
    } catch(err){
        console.error('Error fetching recipes:', err);
        res.status(500).send('Database query failed');
    }
});



app.get('/users/:id', async (req, res) => {
    const sql = `SELECT Users.id AS user_id, Users.email, Users.created_at AS User_createdAt, 
    Ingredients.id AS Ingredient_id, Ingredients.name, Ingredients.created_at AS Ingredient_createdAt 
    FROM Users
    LEFT JOIN UserIngredients ON Users.id = UserIngredients.user_id
    LEFT JOIN Ingredients ON UserIngredients.Ingredient_id = Ingredients.id
    WHERE UserIngredients.User_id = ? `

    try{   
        const [result] = await pool.query(sql, [req.params.id]);
        const user = {};
            user.email = result[0].email;
            user.recipe_createdAt = result[0].user_createdAt;
            user.ingredients = [];
            user.ingredients_id = [];

            result.forEach(row => {
                user.ingredients.push(row.name);
                user.ingredients_id.push(row.Ingredient_id);
            });

            res.json(user);

    }catch (err){
        console.error('Error fetching recipe:', err);
        res.status(500).send('Database query failed');

    }
});


app.get('/recipes/:id', async (req, res) => {
    const sql = `SELECT Recipes.id AS Recipe_id, Recipes.name AS Recipe_name, Recipes.instructions, Recipes.description, Recipes.created_at AS Recipe_createdAt, Recipes.image_url,
    Ingredients.id AS Ingredient_id, Ingredients.name AS Ingredient_name, Ingredients.created_at AS Ingredient_createdAt,
    RecipeIngredients.quantity, RecipeIngredients.unit
    FROM Recipes
    LEFT JOIN RecipeIngredients ON RecipeIngredients.Recipe_id = Recipes.id
    LEFT JOIN Ingredients ON RecipeIngredients.Ingredient_id = Ingredients.id
    WHERE RecipeIngredients.Recipe_id = ?`

    try{
        const [result] = await pool.query(sql, [req.params.id])
        //parsing result
        const recipe = {};

        //static recipe info
        recipe.recipe_id = result[0].Recipe_id;
        recipe.recipe_name = result[0].Recipe_name;
        recipe.recipe_createdAt = result[0].Recipe_createdAt;
        recipe.recipe_instructions = result[0].instructions;
        recipe.recipe_description = result[0].description;
        recipe.recipe_image = result[0].image_url;
        recipe.ingredientArray = [];


        //storing each ingredient
        result.forEach(row => {
            const ingredient = {};
            ingredient.ingredient_id = row.Ingredient_id;
            ingredient.ingredient_name = row.Ingredient_name;
            //quantity and unit
            ingredient.quantity = row.quantity;
            ingredient.unit = row.unit;
            recipe.ingredientArray.push(ingredient);
        });

        //response to client
        res.json(recipe)
        
    }catch (err){
        console.error('Error fetching recipe:', err);
        res.status(500).send('Database query failed');
    }

});


app.post('/recipes', async (req, res) => {
    //getting data from client (req.body)
    const recipe_name = req.body.name;
    const instructions = req.body.instructions;
    const description = req.body.description;
    const image_url = req.body.image_url;

    //check if fields are NULL
    if (!recipe_name || !description || !instructions || !image_url) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    req.body.forEach(ingredient => {
        if (!ingredient.name || !ingredient.quantity || !ingredient.unit) {
            return res.status(400).json({ error: "Missing required ingredient fields" });
        }
        const ingredient_name = ingredient.name;
        const quantity = ingredient.quantity;
        const unit = ingredient.unit;
    });

    //inserting recipe into Recipes table
    const sql = `INSERT INTO Recipes (name, instructions, description, image_url) VALUES (?, ?, ?, ?)`;

    try{
        const [result] = await pool.query(sql, [recipe_name, instructions, description, image_url])
        recipe_id = result.insertId;  // id of the new inserted recipe row
        console.log("Recipe Inserted Successfully, Recipe id = " + result.insertId);
        res.status(201).json({ message: "Recipe added successfully", recipe_id });

    }catch (err){
        console.error('Error inserting recipe:', err);
        res.status(500).send('Database query failed');
    }


    

        //TODO:
        //to return recipe_id for ingredient table, we need to call back
        //check how to async await callback


    });



    

    //TODO: learn adding to database
        //adding to Recipes
        //adding to Ingredients
        //adding to RecipeIngredients
    










app.use((req, res) => {
    res.status(404)
    res.send("404 Page Not Found :(");
});


app.listen(5000, ()=> {
    console.log('server is running port 5000')
})