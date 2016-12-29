--Database Name: grocery_list_generator

CREATE TABLE ingredients (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	store_section_id INT NOT NULL
);

CREATE TABLE store_section (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE recipes (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) UNIQUE NOT NULL,
	servings INT DEFAULT NULL,
	reference_url VARCHAR(200) DEFAULT NULL,
	image_url VARCHAR(200) DEFAULT NULL
);

CREATE TABLE measurements (
	id SERIAL PRIMARY KEY,
	name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE recipe_ingredients (
	recipe_id INT NOT NULL,
	ingredient_id INT NOT NULL,
	measurement_id INT NOT NULL,
	ingredient_amount FLOAT NOT NULL
);

--JOINS

SELECT  recipe_ingredients.recipe_id, recipes.name AS recipe_name, recipe_ingredients.ingredient_amount, measurements.name as measurement_name, ingredients.name AS ingredient_name, store_section.name AS section_name
FROM recipes
JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
JOIN store_section ON ingredients.store_section_id = store_section.id
JOIN measurements ON recipe_ingredients.measurement_id = measurements.id;

SELECT name FROM recipes WHERE id = 1;

SELECT  recipe_ingredients.ingredient_amount, measurements.name as measurement_name, ingredients.name AS ingredient_name, store_section.name AS section_name
FROM recipes
JOIN recipe_ingredients ON recipes.id = recipe_ingredients.recipe_id
JOIN ingredients ON recipe_ingredients.ingredient_id = ingredients.id
JOIN store_section ON ingredients.store_section_id = store_section.id
JOIN measurements ON recipe_ingredients.measurement_id = measurements.id
WHERE recipe_ingredients.recipe_id = 1;
