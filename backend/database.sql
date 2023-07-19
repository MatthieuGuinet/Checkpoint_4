-- -----------------------------------------------------

-- Table `mybooks`.`user`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `mybooks`.`user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `username` VARCHAR(80) NOT NULL,
        `hashed_password` VARCHAR(150) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `mybooks`.`favorite`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `mybooks`.`favorite` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `book_title` VARCHAR(150) NOT NULL,
        `book_author` VARCHAR(100) NOT NULL,
        `user_id` INT NOT NULL,
        `is_read` TINYINT NOT NULL DEFAULT 0,
        PRIMARY KEY (`id`),
        INDEX `fk_favorite_user_idx` (`user_id` ASC) VISIBLE,
        CONSTRAINT `fk_favorite_user` FOREIGN KEY (`user_id`) REFERENCES `mybooks`.`user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

---- INSERT ONE USER

INSERT INTO
    `user`(hashed_password, username)
VALUES
(
        '$argon2id$v=19$m=65536,t=5,p=1$lgQhMd6/YI8RXwZQrt1VMA$oBtHiEp7JSwbC+H8aVkORWC2ycR5fln8a2CrKvPT9pQ',
        'matthieu'
    );