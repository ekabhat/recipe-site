-- @block
CREATE TABLE users(
    id integer PRIMARY KEY AUTOINCREMENT,
    email varchar NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP
)


-- @block
CREATE TABLE Recipes(
    id integer PRIMARY KEY AUTOINCREMENT,
    title varchar NOT NULL,
    description text NOT NULL,
    instructions text NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

-- @block
CREATE TABLE Ingredients(
    id integer PRIMARY KEY AUTOINCREMENT,
    name varchar NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP
);

-- @block
CREATE TABLE UserIngredients(
    id integer PRIMARY KEY AUTOINCREMENT,
    user_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);


-- @block
CREATE TABLE RecipeIngredients(
    id integer PRIMARY KEY AUTOINCREMENT,
    recipe_id integer NOT NULL,
    ingredient_id integer NOT NULL,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);