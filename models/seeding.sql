USE project_db;
SET FOREIGN_KEY_CHECKS=0;

-- inserts for products
INSERT INTO products (name, description, image_name, price, stock, categoryId, createdAt, updatedAt) VALUES
('TissueBox', 'empty box, white', 'tissuebox.jpg', '8.99', '1', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('PiggyBank', 'piggy bank that looks like it is blasting into outer space', 'piggybank.jpg', '25.99', '1', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Bumblebee Pen', 'pen with a bumbleebee on the top', 'bumblebeepen.jpg', '5.00', '2', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01');


-- inserts for categories
INSERT INTO categories (name, description, image_name) VALUES
('Trash', 'Shop  Trash', 'trashimg.jpg'),
('Teasure', 'Shop Treasure', 'treasureimg.jpg'),
('InBetween', 'Shop InBetween', 'inbetween.png');

-- inserts for users
INSERT INTO users (username, password, email, createdAt, updatedAt) VALUES
('bestrosey', 'mypassword1234', 'ian@ian.com', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Fatima', 'mypassword1234', 'fatima@fatima.com', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('janedoe', '$2b$10$dFcPPJQ6iijpdaHH475xqOoYJq3Q7YY3itx.Hotly.XL9y3URc1m6', 'janedoe@gmail.com', '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for cart_items
INSERT INTO cart_items (num, each_price, userId, productId) VALUES
('1', '20.99', '1', '12'),
('1', '39.99', '1', '13'),
('4', '8.99', '1', '6'),
('3', '8.99', '2', '1'),
('2', '75.99', '2', '5'),
('1', '58.99', '2', '14'),
('2', '20.99', '2', '12');

SET FOREIGN_KEY_CHECKS=1;