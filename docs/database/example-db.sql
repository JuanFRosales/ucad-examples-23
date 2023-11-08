DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare

-- Create tables
CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


-- Add users
INSERT INTO Users 
    VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users 
    VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

-- Add media items

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', '', 1606, 'image/jpeg'),
         ('ffd8.jpg', 887574, 'Favorite drink', '', 1606, 'image/jpeg');



select filename, title, username from mediaitems JOIN users ON users.user_id=mediaitems.user_id;


