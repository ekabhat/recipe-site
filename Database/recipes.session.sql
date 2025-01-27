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
