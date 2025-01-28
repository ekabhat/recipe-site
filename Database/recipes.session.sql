-- @block
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



-- @block
CREATE TABLE Recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description text NOT NULL,
    instructions text NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE Ingredients(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE UserIngredients(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);


-- @block
CREATE TABLE RecipeIngredients(
    id INT PRIMARY KEY AUTO_INCREMENT,
    recipe_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    quantity VARCHAR(100),
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);



-- @block
SELECT * FROM users;
SELECT * FROM Ingredients;
SELECT * FROM Recipes;
SELECT * FROM UserIngredients;
SELECT * FROM RecipeIngredients;


