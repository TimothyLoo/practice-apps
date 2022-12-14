-- CREATE DATABASE `checkout`;

USE `checkout`;

DROP TABLE IF EXISTS `responses`;
DROP TABLE IF EXISTS `shippingInfo`;

DROP TABLE IF EXISTS `users`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `s_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(16) NOT NULL
);

DROP TABLE IF EXISTS `shipping_info`;

CREATE TABLE IF NOT EXISTS `shipping_info` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `s_id` VARCHAR(255) NOT NULL,
  `address_1` VARCHAR(50) NOT NULL,
  `address_2` VARCHAR(50) NOT NULL,
  `city` VARCHAR(50) NOT NULL,
  `state` VARCHAR(50) NOT NULL,
  `zip` VARCHAR(6) NOT NULL
);

DROP TABLE IF EXISTS `billing_info`;

CREATE TABLE IF NOT EXISTS `billing_info` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `s_id` VARCHAR(255) NOT NULL,
  `ccn` VARCHAR(255) NOT NULL,
  `expDt` VARCHAR(255) NOT NULL,
  `cvv` VARCHAR(255) NOT NULL,
  `bill_zip` VARCHAR(255) NOT NULL
);

-- DROP TABLE IF EXISTS `purchases`;

-- CREATE TABLE IF NOT EXISTS `purchases` (
--   `s_id` VARCHAR(255) NOT NULL PRIMARY KEY
-- );