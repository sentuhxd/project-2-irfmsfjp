USE project_db;
SET FOREIGN_KEY_CHECKS=0;

-- inserts for products
INSERT INTO products (name, description, image_name, price, stock, categoryId) VALUES
('TissueBox', 'empty box, white', 'tissuebox.jpg', '8.99', '1', '1'),
('PiggyBank', 'piggy bank that looks like it is blasting into outer space', 'piggybank.jpg', '25.99', '1', '2'),
('Bumblebee Pen', 'pen with a bumbleebee on the top', 'bumblebeepen.jpg', '5.00', '2', '3'),
('$75 bamazon Gift Card', 'Use bamazon Gift Cards to shop at our sister site.', 'bamazon75.png', '58.99', '32', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$100 bamazon Gift Card', 'BEST VALUE... Use bamazon Gift Cards to shop at our sister site.', 'bamazon100.png', '75.99', '63', '2', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$10 eBook Cash', 'e-Book cash can be used at our e-Books sister site.', 'ebooks10.png', '8.99', '76', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$25 eBook Cash', 'e-Book cash can be used at our e-Books sister site.', 'ebooks25.png', '20.99', '92', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$50 eBook Cash', 'e-Book cash can be used at our e-Books sister site.', 'ebooks50.png', '39.99', '43', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$75 eBook Cash', 'e-Book cash can be used at our e-Books sister site.', 'ebooks75.png', '58.99', '16', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$100 eBook Cash', 'BEST VALUE... e-Book cash can be used at our e-Books sister site.', 'ebooks100.png', '75.99', '11', '1', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$10 eGame Cash', 'e-Game cash can be used at our e-Games sister site.', 'egames10.png', '8.99', '41', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$25 eGame Cash', 'e-Game cash can be used at our e-Games sister site.', 'egames25.png', '20.99', '21', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$50 eGame Cash', 'e-Game cash can be used at our e-Games sister site.', 'egames50.png', '39.99', '18', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$75 eGame Cash', 'e-Game cash can be used at our e-Games sister site.', 'egames75.png', '58.99', '3', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('$100 eGame Cash', 'BEST VALUE... e-Game cash can be used at our e-Games sister site.', 'egames100.png', '75.99', '4', '3', '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for categories
INSERT INTO categories (name, description, image_name) VALUES
('Trash', 'Shop  Trash', 'trashimg.jpg'),
('Teasure', 'Shop Treasure', 'treasureimg.jpg'),
('InBetween', 'Shop InBetween', 'inbetween.png');

-- inserts for users
INSERT INTO users (username, password, email, createdAt, updatedAt) VALUES
('ianrosey', 'mypassword1234', 'ian@email.com', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Fatima', 'mypassword1234', 'fatima@fatima.com', '2019-05-08 21:09:01', '2019-05-08 21:09:01'),
('Steven', 'mypassword12345', 'stevem@email.com', '2019-05-08 21:09:01', '2019-05-08 21:09:01');

-- inserts for cart_items
INSERT INTO cartitems (num, each_price, userId, productId) VALUES
('1', '20.99', '1', '12'),
('1', '39.99', '1', '13'),
('4', '8.99', '1', '6'),
('3', '8.99', '2', '1'),
('2', '75.99', '2', '5'),
('1', '58.99', '2', '14'),
('2', '20.99', '2', '12');

SET FOREIGN_KEY_CHECKS=1;