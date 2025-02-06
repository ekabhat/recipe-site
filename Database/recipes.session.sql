-- @block
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);



-- @block
CREATE TABLE Recipes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description text NOT NULL,
    instructions text NOT NULL,
    image_url VARCHAR(255),
    created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE Ingredients(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
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
    unit VARCHAR(100),
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);



-- @block
SELECT * FROM Users;
SELECT * FROM Ingredients;
SELECT * FROM Recipes;
SELECT * FROM UserIngredients;
SELECT * FROM RecipeIngredients;


-- @block
DROP TABLE IF EXISTS RecipeIngredients;
DROP TABLE IF EXISTS Recipes;
DROP TABLE IF EXISTS UserIngredients;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Ingredients;


-- populate data
-- @block
-- Insert Users
INSERT INTO Users (email) VALUES
('user1@example.com'),
('user2@example.com'),
('user3@example.com'),
('user4@example.com'),
('user5@example.com');

-- Insert Ingredients
INSERT INTO Ingredients (name) VALUES
('Flour'),
('Sugar'),
('Milk'),
('Eggs'),
('Butter'),
('Salt'),
('Olive Oil'),
('Chicken'),
('Tomato Sauce'),
('Cheese');

-- Insert Recipes
INSERT INTO Recipes (name, description, instructions, image_url) VALUES
('Pancakes', 'Fluffy pancakes made from scratch.', 
 '1. Mix ingredients.\n2. Cook on skillet.', 'https://example.com/pancakes.jpg'),
('Spaghetti Bolognese', 'Classic Italian pasta dish.', 
 '1. Cook pasta.\n2. Prepare sauce.\n3. Combine.', 'https://example.com/spaghetti.jpg'),
('Chicken Curry', 'A spicy and flavorful dish.', 
 '1. Marinate chicken.\n2. Cook with spices.', 'https://example.com/curry.jpg'),
('Chocolate Cake', 'Rich and moist chocolate cake.', 
 '1. Bake the cake.\n2. Add frosting.', 'https://example.com/cake.jpg'),
('Vegetable Salad', 'A healthy mix of fresh veggies.', 
 '1. Chop vegetables.\n2. Add dressing.', 'https://example.com/salad.jpg');

-- Insert User Ingredients (What Users Have)
INSERT INTO UserIngredients (user_id, ingredient_id) VALUES
(1, 1), (1, 2), (1, 3),  -- User 1 has Flour, Sugar, Milk
(2, 4), (2, 5),          -- User 2 has Eggs, Butter
(3, 6), (3, 7),          -- User 3 has Salt, Olive Oil
(4, 8), (4, 9),          -- User 4 has Chicken, Tomato Sauce
(5, 10);                 -- User 5 has Cheese

-- Insert Recipe Ingredients (What Recipes Need)
INSERT INTO RecipeIngredients (recipe_id, ingredient_id, quantity, unit) VALUES
(1, 1, '200', 'grams'), (1, 2, '50', 'grams'), (1, 3, '1', 'cup'), 
(1, 4, '2', 'pieces'), (1, 5, '30', 'grams'),  -- Pancakes

(2, 8, '250', 'grams'), (2, 9, '200', 'ml'), (2, 10, '100', 'grams'), -- Spaghetti

(3, 8, '300', 'grams'), (3, 6, '1', 'tsp'), (3, 7, '2', 'tbsp'), -- Chicken Curry

(4, 1, '250', 'grams'), (4, 2, '200', 'grams'), (4, 4, '3', 'pieces'), (4, 5, '50', 'grams'), -- Chocolate Cake

(5, 6, '1', 'pinch'), (5, 7, '1', 'tbsp'), (5, 10, '50', 'grams'); -- Salad


-- @block
ALTER TABLE Ingredients ADD UNIQUE (name);
