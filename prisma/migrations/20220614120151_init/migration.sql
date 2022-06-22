-- CreateTable
CREATE TABLE `author` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female') NULL,
    `job` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `created_at` BIGINT UNSIGNED NOT NULL,
    `updated_at` BIGINT UNSIGNED NULL,

    UNIQUE INDEX `author_email_key`(`email`),
    UNIQUE INDEX `author_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `img` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` BIGINT UNSIGNED NOT NULL,
    `updated_at` BIGINT UNSIGNED NULL,
    `id_author` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_id_author_fkey` FOREIGN KEY (`id_author`) REFERENCES `author`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
