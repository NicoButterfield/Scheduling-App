--@block
SELECT * FROM todos WHERE complete = '1'

-- --@block
-- CREATE TABLE `todo`.`todos`
-- ( 
--     `todo_id` INT NOT NULL AUTO_INCREMENT, 
--     `todo` MEDIUMTEXT NULL, 
--     `complete` TINYINT NOT NULL DEFAULT '0', 
--     `date_complete` DATETIME NULL ON UPDATE CURRENT_TIMESTAMP, 
--     `LIST` VARCHAR(85) NULL, 
--     PRIMARY KEY (`todo_id`)
-- );


--@block
CREATE TABLE Users
(
    user VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (user)
);

--@block
CREATE TABLE todos
(
    todo_id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(255) NOT NULL,
    todo MEDIUMTEXT NULL, 
    complete TINYINT NOT NULL DEFAULT 0, 
    remov TINYINT NOT NULL DEFAULT 0,
    PRIMARY KEY (todo_id)
);

--@block
DESCRIBE Users;

--@block
DESCRIBE todos;

--@block
INSERT INTO todos(user, todo) 
VALUES (
    'Ixex1', 
    'yummmm'
);


--@block
INSERT INTO Users(user, pass) 
VALUES (
    'Ixex1234', 
    'Iceice!!!!'
);

--@block
SELECT * FROM todos WHERE user = 'NicoButterfield'

--@block
SELECT pass FROM users WHERE user = 'Ixex1'

--@block
SELECT * FROM users 


--@block
SELECT * FROM todos WHERE user = 'Nico';

--@block
DELETE * FROM todos WHERE user = 'NicoButterfield' && remov = '1';

--@block
UPDATE todos SET complete = '1' WHERE todo_id = '40'