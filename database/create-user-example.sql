CREATE USER 'mediashare'@'mediashare' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON mediashare.* TO 'mediashare'@'localhost';
FLUSH PRIVILEGES;