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
